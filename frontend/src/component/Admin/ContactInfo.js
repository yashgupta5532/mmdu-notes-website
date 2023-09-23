import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import "./ContactInfo.css"; // Import your CSS file

const ContactInfo = () => {
  const [contactFormSubmissions, setContactFormSubmissions] = useState([]);

  useEffect(() => {
    // Fetch contact form submissions
    axios
      .get("http://localhost:4000/api/contact")
      .then((response) => {
        setContactFormSubmissions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contact form submissions:", error);
      });
  }, []);

  return (
    <Fragment>
      <div className="contact-container">
        <h1 className="contact-title">Contact Form Submissions</h1>
        <ul className="submission-list">
          {contactFormSubmissions.map((submission) => (
            <li key={submission._id} className="submission-item">
              <div className="contact-form-info">
                <h4 className="submission-user">
                  Submitted by: {submission.name}
                </h4>
                <p className="submission-email">Email: {submission.email}</p>
                <p className="submission-contact">
                  Contact Number: {submission.contactNo}
                </p>
                <p className="submission-message">
                  Message: {submission.message}
                </p>
                <p className="submission-date">
                  Submitted At:{" "}
                  {new Date(submission.createdAt).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default ContactInfo;
