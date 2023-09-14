import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import shareLogo from "../../images/image1.png";

const Footer = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <>
      <div className="footer-container">
        <div className="about-footer">
          <div className="share">
            <p className="logo">SHARE-NOTES-TOGETHER</p>
            <img className="logo-img" src={shareLogo} alt="Logo" />
          </div>

          <div className="about-content-container">
            <p className="about-us-title">ABOUT US</p>
            <div className="about-content">
              <h2>MMDU-MAHARISHI MARKANDESHWOR DEEMED TO BE UNIVERSITY</h2>
              <br />
              <h4>
                Encourage users to join the community of note-sharing
                enthusiasts, contributing their knowledge and benefiting from
                the collective wisdom of their peers.
              </h4>
            </div>
          </div>

          <div className="Contact-contribute-container">
            <a
              href="mailto:yashgupta5532@gmail.com"
              className="about-us-title"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the Community
            </a>
            <a
              href="https://github.com/yashgupta5532/Social_Media_Application"
              className="about-us-title"
              target="_blank"
              rel="noopener noreferrer"
            >
              Want to contribute
            </a>

            <div className="linking">
              <div>
                <a href="https://www.linkedin.com/in/yash-gupta-1a0055267">
                  LinkedIn
                </a>
              </div>
              <div>
                <a href="https://github.com/yashgupta5532?tab=repositories">
                  Github
                </a>
              </div>
              <div>
                <a href="https://facebook.com">Facebook</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom-container">
          <p className="copyright">
            Copyright © 2023 Share-Notes. <br /> All Rights Reserved
          </p>
          <div className="footer-link">
            <Link
              to="/"
              className="footer-link-item"
              style={{ textDecoration: "none" }}
            >
              Home
            </Link>
            <Link
              to={"/profile/" + currentUser._id}
              className="footer-link-item"
              style={{ textDecoration: "none" }}
            >
              Profile
            </Link>
            <Link
              to="/searchuser"
              className="footer-link-item"
              style={{ textDecoration: "none" }}
            >
              Chat
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
