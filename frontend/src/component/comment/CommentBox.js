import React, { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";
import "./CommentBox.css";
import { Link } from "react-router-dom";
import profile from "../../images/profile.png";

const CommentBox = ({ userinfo, text }) => {
  
  const [user, setuser] = useState({});
  const [isfetchuser, setisfetchuser] = useState(false);
  useEffect(() => {
    const fetchuser = async () => {
      const res = await publicRequest.get(`users/${userinfo}`);
      setuser(res.data);
      setisfetchuser(true);
    };
    fetchuser();
  }, []);

  return (
    <>
      <div className="comment-box-container">
        <Link to={`/profile/${userinfo}`} style={{ textDecoration: "none" }}>
          <img
            src={user.profilePicture ? user.profilePicture : profile}
            className="comment-box-img"
          ></img>
        </Link>
        <div className="comment-box-message-name">
          <p className="comment-box-message-name-value">
            {user && user.username}
          </p>
          <p className="comment-box-message">{text}</p>
        </div>
      </div>
    </>
  );
};

export default CommentBox;
