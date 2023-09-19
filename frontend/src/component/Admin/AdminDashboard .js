
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css"; // Import your CSS file

const AdminDashboard = () => {
  const [pendingNotes, setPendingNotes] = useState([]);

  useEffect(() => {
    // Fetch all notes from the server when the component mounts
    axios
      .get("http://localhost:4000/api/notes")
      .then((response) => {
        console.log(response.data); // Log the response data
        setPendingNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  const approveNote = (noteId) => {
    // Make an API call to approve the note
    axios
      .put(`http://localhost:4000/api/notes/${noteId}`, { status: "Approved" })
      .then(() => {
        // Update the status of the note in the local state
        setPendingNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === noteId ? { ...note, status: "Approved" } : note
          )
        );
      })
      .catch((error) => {
        console.error("Error approving note:", error);
      });
  };

  const rejectNote = (noteId) => {
    // Make an API call to reject the note
    axios
      .put(`http://localhost:4000/api/notes/${noteId}`, { status: "Rejected" })
      .then(() => {
        // Update the status of the note in the local state
        setPendingNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === noteId ? { ...note, status: "Rejected" } : note
          )
        );
      })
      .catch((error) => {
        console.error("Error rejecting note:", error);
      });
  };

  return (
    <div className="admin-dashboard">
      <h1 style={{ textAlign: "center" }}>All Notes (Including Approved/Rejected)</h1>
      <ul>
        {pendingNotes.map((note) => (
          <li key={note._id}>
            <div className="note-info">
              <h4>{note.notename}</h4>
              <p>
                Uploaded by: <b>{note.userId.username} ({note.userId.email})</b>
              </p>
              <p>Status: <b> {note.status}</b></p>
              <div className="item" style={{ display: "flex", justifyContent: "space-around" }}>
                <a
                  href={note.notefilename}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textAlign: "center", justifyContent: "center" }}
                >
                  View File
                </a>
                <img src={note.thumbnailfilename} alt="Thumbnail" />
              </div>
            </div>
            <div className="note-actions">
              {note.status === "Pending" && (
                <>
                  <button
                    className="approve-button"
                    onClick={() => approveNote(note._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => rejectNote(note._id)}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;