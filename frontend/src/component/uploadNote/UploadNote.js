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

  const uploadNoteFormSubmitHandler = async (e) => {
    alert.show("Uploading started, it will take a few minutes...", {
      timeout: 5000, // Display the alert for 5 seconds
    });
    e.preventDefault();

    // Create a FormData object to send the file
    const data = new FormData();
    const cloudName = "dbd0psf0f";
    data.append("file", fileimg); // Make sure this matches your server's file field name
    const upload_preset = "handnoteimages";
    data.append("upload_preset", "handnoteimages");

    const cloudinaryUploadURL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=${upload_preset}`;
    try {
      const res = await axios.post(cloudinaryUploadURL, data);

      // Prepare the data to be sent to your server
      const newNote = {
        userId: user._id,
        desc: descritpion.current.value,
        notename: notename.current.value,
        notefilename: fileurl, // This should be the URL of the note, not the file itself
        thumbnailfilename:
          "https://res.cloudinary.com/dbd0psf0f/image/upload/v1694859655/notesImages/doraemon_dbw9v9.jpg", //Set the thumbnail URL
      };

      if (fileimg) {
        const data = new FormData();
        data.append("file", fileimg);
        data.append("upload_preset", "handnoteimages");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dbd0psf0f/image/upload",
          data
        );
        newNote.thumbnailfilename = res.data.secure_url;
        console.log(res.data.secure_url);
      }

      // Send the data to your server
      await publicRequest.post("/notes", newNote);

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
              placeholder="Notename(not more than 30 character)*"
              style={{ color: "white" }}
              className="uploadNote-form-note-name"
              id="upload-note-input"
              ref={notename}
              maxLength="30"
              required
            ></input>
            <input
              type="text"
              placeholder="Descritpion(not more than 300 character)*"
              className="uploadNote-form-descritpion"
              ref={descritpion}
              id="upload-note-input"
              maxLength="300"
              required
            ></input>
            <input
              type="text"
              id="upload-note-input"
              onChange={(e) => setfileurl(e.target.value)}
              placeholder="Url of note*"
              required
            ></input>
            <label for="thumbnail-file-upload" className="custom-file-upload">
              <Image className={classes.upload} />
              <p>ThumbNail Image</p>
              <CloudUpload className={classes.upload} />
            </label>
            <input
              placeholder="Thumbnail image"
              type="file"
              id="thumbnail-file-upload"
              accept=".png,.jpeg,.jpg"
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
