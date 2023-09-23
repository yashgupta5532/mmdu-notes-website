import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [adminNotes, setAdminNotes] = useState([]);
  useEffect(() => {
    // Fetch all notes with statuses "Pending," "Rejected," and "Approved"
    axios
      .get("http://localhost:4000/api/notes/admin")
      .then((response) => {
        setAdminNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching admin notes:", error);
      });
  }, []);

  const updateNoteStatus = (noteId, newStatus) => {
    // Make an API call to update the status of the note
    axios
      .put(`http://localhost:4000/api/notes/approve/${noteId}`, {
        status: newStatus,
      },{new:true})
      .then(() => {
        // Update the status of the note in the local state
        setAdminNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === noteId ? { ...note, status: newStatus } : note
          )
        );
      })
      .catch((error) => {
        console.error("Error updating note status:", error);
      });

  };

  return (
    <div className="admin-dashboard">
      <h1 style={{ textAlign: "center" }}>
        All Notes (Pending/Rejected/Approved)
      </h1>
      <Link to="/contactinfo" className="contact-info">Contact us info </Link>
      <ul>
        {adminNotes.map((note) => (
          <li key={note._id}>
            <div className="note-info">
              <h4>{note.notename}</h4>
              <p>
                Uploaded by:{" "}
                <b>
                  {note.userId.username} ({note.userId.email})
                </b>
              </p>
              <p>Title: <b> {note.notename}</b></p>
              <p>Status: <b> {note.status}</b></p>
              <p>Created At: {new Date(note.createdAt).toLocaleString()}</p>
              <div className="item">
                <a
                  href={note.notefilename}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View File
                </a>
                {note.thumbnailfilename && (
                  <img src={note.thumbnailfilename} alt="Thumbnail" />
                )}
              </div>
            </div>
            <div className="note-actions">
              {note.status === "Pending" && (
                <>
                  <button
                    className="approve-button"
                    onClick={() => updateNoteStatus(note._id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => updateNoteStatus(note._id, "Rejected")}
                  >
                    Reject
                  </button>
                </>
              )}
              {note.status === "Approved" && (
                <button
                  className="reject-button"
                  onClick={() => updateNoteStatus(note._id, "Rejected")}
                >
                  Re-Reject
                </button>
              )}
              {note.status === "Rejected" && (
                <button
                  className="approve-button"
                  onClick={() => updateNoteStatus(note._id, "Approved")}
                >
                  Re-Approve
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
