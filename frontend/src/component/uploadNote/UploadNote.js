import React, { useRef } from "react";
import "./UploadNote.css";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  CloudUpload,
  Close,
  PictureAsPdf,
  AddCircle,
  Image,
} from "@material-ui/icons";
import { publicRequest } from "../../requestMethods";
import { makeStyles } from "@material-ui/core/styles";
import { mobile } from "../../responsive";
import { useAlert } from "react-alert";

const useStyles = makeStyles((theme) => ({
  uploadIcon: {
    color: "#167eec",
    fontSize: "3rem",
  },
  UploadPdfIcon: {
    color: "#167eec",
    fontSize: "3rem",
  },
  closeIcon: {
    fontSize: "3rem",
  },
  uploadAdd: {
    color: "#167eec",
    fontSize: "3rem",
  },
  upload: {
    color: "#167eec",
    fontSize: "2rem",
  },
}));

const UploadNote = () => {
  const { currentUser: user } = useSelector((state) => state.user);
  const alert = useAlert();

  const ShowForm = useRef();
  const notename = useRef();
  const descritpion = useRef();
  const [isupload, setsetisupload] = useState(false);
  const [fileurl, setfileurl] = useState("");
  const [fileimg, setfileimg] = useState("");

  const ShowFormHandler = () => {
    if (ShowForm.current.style.display === "flex")
      ShowForm.current.style.display = "none";
    else ShowForm.current.style.display = "flex";
  };

  // Function to handle form submission
  const uploadNoteFormSubmitHandler = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the file
    const data = new FormData();
    const cloudName = "dbd0psf0f";
    data.append("file", fileimg);
    const upload_preset = "handnoteimages";
    data.append("upload_preset", upload_preset);

    const cloudinaryUploadURL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=${upload_preset}`;
    
    try {
      // Upload the image to Cloudinary
      const cloudinaryResponse = await axios.post(cloudinaryUploadURL, data);

      // Prepare the data to be sent to your server
      const newNote = {
        userId: user._id,
        desc: descritpion.current.value,
        notename: notename.current.value,
        notefilename: fileurl, // This should be the URL of the note, not the file itself
        thumbnailfilename: cloudinaryResponse.data.secure_url, // Use the secure URL from Cloudinary
      };
   
      // Send the data to your server
      const response = await publicRequest.post("/notes/upload", newNote);

      // After successful upload, you can reset the form or perform any other actions
      alert.success("Successfully uploaded");
      setsetisupload(false); // Reset the form
    } catch (error) {
      console.error("Error uploading thumbnail image: ", error);
      alert.error("Error while uploading");
    }
  };


  const classes = useStyles();

  return (
    <>
      {!isupload && (
        <div
          className="uploadNote-post"
          onClick={() => {
            setsetisupload((curr) => !curr);
          }}
        >
          <PictureAsPdf className={classes.UploadPdfIcon} />
          <p className="uploadNote-post-text">Upload a Note</p>
          <CloudUpload className={classes.uploadIcon} />
        </div>
      )}
      {isupload && (
        <div className="uploadNote-form-container">
          <div className="upload-note-top">
            <div className="upload-note-top-left">
              <AddCircle className={classes.uploadAdd} />
              <p className="upload-note-title">Upload a Note</p>
            </div>
            <Close
              onClick={() => {
                setsetisupload((curr) => !curr);
              }}
              className={classes.closeIcon}
              id="close-icon"
            />
          </div>
          <form
            onSubmit={uploadNoteFormSubmitHandler}
            className="uploadNote-form"
          >
            <input
              type="text"
              style={{ color: "white" }}
              placeholder="Notename (not more than 30 characters)*"
              className="uploadNote-form-note-name"
              id="upload-note-input"
              ref={notename}
              maxLength="30"
              required
            ></input>
            <input
              type="text"
              style={{ color: "white" }}
              placeholder="Description (not more than 300 characters)*"
              className="uploadNote-form-description"
              ref={descritpion}
              id="upload-note-input"
              maxLength="300"
              required
            ></input>
            <input
              type="text"
              id="upload-note-input"
              value={fileurl}
              onChange={(e) => setfileurl(e.target.value)}
              style={{ color: "white" }}
              placeholder="URL of note*"
              required
            ></input>

            <label htmlFor="thumbnail-file-upload" className="custom-file-upload">
              <Image className={classes.upload} />
              <p>Choose Thumbnail Image</p>
              <CloudUpload className={classes.upload} />
            </label>
            <input
              style={{ color: "white" }}
              placeholder="Thumbnail image"
              type="file"
              id="thumbnail-file-upload"
              accept=".png, .jpeg, .jpg"
              onChange={(e) => setfileimg(e.target.files[0])}
            ></input>
            <button type="submit" className="uploadNote-form-submit-button">
              Upload
            </button>
          </form>
        </div>
      )}
    </>
  );
};


export default UploadNote;