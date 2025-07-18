import React from "react";

const NotesCard = ({ documentName, documentUrl, thumbnail, description }) => {
  return (
    <div className="document-card">
      <h5 className="title">{documentName}</h5>
      <div className="doc-img">
        <img src={thumbnail} alt={documentName} />
      </div>
      <div className="description">{description.length<50?description:description.split(' ').slice(0,20).join(' ')+"..."}</div>
      <div className="btn">
          {" "}
          <a
            href={documentUrl}
            style={{ textDecoration: "none", color: "black" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read
          </a>
        <a href={documentUrl} style={{ textDecoration: "none", color: "black" }}
            target="_blank"
            rel="noopener noreferrer" download={documentName}>
          Download
        </a>
      </div>
    </div>
  );
};

export default NotesCard;
