import React, { Fragment, useState } from "react";
import SemCard from "./SemCard";
import NotesCard from "./NotesCard";
import MenuIcon from "@mui/icons-material/Menu";
import "./Notes.css";
import img1 from '../../images/img1.png'

const Notes = () => {
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

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

  const semestersData = [
    {
      id: 1,
      name: "Semester 1",
      subjects: [
        {
          subjectName: "Physics",
          chapters: [
            {
              chapterName: "Chapter 1",
              documents: [
                {
                  documentName: "Document 1",
                  documentUrl:
                    "https://drive.google.com/file/d/1SaKycOTamK6Cvbfje7cSyuZu5RFnEp43/view?usp=drive_link",
                  thumbnail: 'https://img.freepik.com/free-vector/taking-notes-concept-illustration_114360-1114.jpg?size=626&ext=jpg',
                  description:
                    "You can provide the description of your notes",
                },
                
              ],
            },
            {
              chapterName: "Chapter 2",
              documents: [
                {
                  documentName: "Document 1",
                  documentUrl:
                    "https://drive.google.com/file/d/1SaKycOTamK6Cvbfje7cSyuZu5RFnEp43/view?usp=drive_link",
                  thumbnail: 'https://img.freepik.com/free-vector/taking-notes-concept-illustration_114360-1114.jpg?size=626&ext=jpg',
                  description:
                    "You can provide the description of your notes",
                },
                
              ],
            },
            {
              chapterName: "Chapter 3",
              documents: [
                {
                  documentName: "Document 1",
                  documentUrl:
                    "https://drive.google.com/file/d/1SaKycOTamK6Cvbfje7cSyuZu5RFnEp43/view?usp=drive_link",
                  thumbnail: 'https://img.freepik.com/free-vector/taking-notes-concept-illustration_114360-1114.jpg?size=626&ext=jpg',
                  description:
                    "You can provide the description of your notes",
                },
                
              ],
            },
            {
              chapterName: "Chapter 4",
              documents: [
                {
                  documentName: "Document 1",
                  documentUrl:
                    "https://drive.google.com/file/d/1SaKycOTamK6Cvbfje7cSyuZu5RFnEp43/view?usp=drive_link",
                  thumbnail: 'https://img.freepik.com/free-vector/taking-notes-concept-illustration_114360-1114.jpg?size=626&ext=jpg',
                  description:
                    "You can provide the description of your notes",
                },
                
              ],
            },
            // Add more chapters for Physics...
          ],
        },
        {
          subjectName: "Chemistry",
          chapters: [
            // Add chapters and documents for Subject 2...
          ],
        },
        // Add more subjects for Semester 1...
      ],
    },
    {
      id: 2,
      name: "Semester 2",
      subjects: [
        // Add subjects, chapters, and documents for Semester 2...
      ],
    },
    // Add more semesters...
  ];

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
        <MenuIcon
          onClick={handleHamBurger}
          style={{ font: "2vmax" }}
        />
      </div>
      <div className="main" style={{ display: "flex" }}>
        <div
          className="left-col"
          style={{ display: isVisible ? "block" : "none" }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((semesterNumber) => (
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
                <h2 className="title" style={{fontWeight:300, textAlign:"center",border:"1px dotted gray"}}>{`Semester ${selectedSemester} Notes`}</h2>
                <div className="subject-container">
                  {semestersData[selectedSemester - 1].subjects.map(
                    (subject, subjectIndex) => (
                      <div key={subjectIndex}>
                        <h3 className="title" style={{textDecoration:"underline",textAlign:"center"}}>{subject.subjectName}</h3>
                        <div className="chapter-container">
                          {subject.chapters.map((chapter, chapterIndex) => (
                            <div key={chapterIndex}>
                              <h4 className="title" style={{textDecoration:"underline",textAlign:"center"}}>{chapter.chapterName}</h4>
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
