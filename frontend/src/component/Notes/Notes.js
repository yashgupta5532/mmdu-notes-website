import React, { Fragment, useState } from "react";
import SemCard from "./SemCard";
import NotesCard from "./NotesCard";
import MenuIcon from "@mui/icons-material/Menu";
import "./Notes.css";

// Import semestersData from the external file
import semestersData from "./semestersData"; // Replace with the actual path

const Notes = () => {
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleSemesterClick = (semesterNumber) => {
    setSelectedSemester(semesterNumber);
    setSelectedSubject(null); // Reset selected subject when changing semesters
  };

  const handleSubjectClick = (subjectName) => {
    setSelectedSubject(subjectName);
  };

  const handleHamBurger = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Fragment>
      <h2
        style={{
          fontWeight: "300",
          textAlign: "center",
          background: "gray",
          cursor: "pointer",
        }}
      >
        MMDU-NOTES
      </h2>
      <div className="hamburger">
        <MenuIcon onClick={handleHamBurger} />
      </div>
      <div className="main" style={{ display: "flex" }}>
        <div
          className="left-col"
          style={{ display: isVisible ? "block" : "none" }}
        >
          {[1, 2, 3, 4,5,6,7,8].map((semesterNumber) => (
            <SemCard
              key={semesterNumber}
              i={semesterNumber}
              onClick={() => handleSemesterClick(semesterNumber)}
              active={semesterNumber === selectedSemester}
            />
          ))}
        </div>
        <div className="right-col">
          <div className="right-content">
            {selectedSemester !== null && (
              <div>
                <h2
                  className="title"
                  style={{
                    fontWeight: 600,
                    textAlign: "center",
                    border: "1px dotted gray",
                  }}
                >{`Semester ${selectedSemester} Notes`}</h2>
                <div className="subject-container notes-display-none">
                  {semestersData[selectedSemester - 1].subjects.map(
                    (subject, subjectIndex) => (
                      <div key={subjectIndex}>
                        <h3
                          className="title"
                          style={{
                            textDecoration: "underline",
                            textAlign: "center",
                          }}
                        >
                          {subject.subjectName}
                        </h3>
                        <div className="chapter-container">
                          {subject.chapters.map((chapter, chapterIndex) => (
                            <div key={chapterIndex}>
                              <h4
                                className="title"
                                style={{
                                  textDecoration: "underline",
                                  textAlign: "center",
                                }}
                              >
                                {chapter.chapterName}
                              </h4>
                              <div className="document-container">
                                {chapter.documents.map(
                                  (document, documentIndex) => (
                                    <NotesCard
                                      key={documentIndex}
                                      documentName={document.documentName}
                                      documentUrl={document.documentUrl}
                                      thumbnail={document.thumbnail}
                                      description={document.description}
                                    />
                                  )
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                  {selectedSemester === null && (
                    <div>
                      <h2
                        className="title"
                        style={{
                          fontWeight: 600,
                          textAlign: "center",
                          justifyItems:"center",
                          border: "1px dotted gray",
                        }}
                      >{`Coming Soon`}</h2>
                      <p style={{ textAlign: "center", fontSize: "18px" }}>
                        Notes for semesters 5 to 8 are coming soon!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Notes;
