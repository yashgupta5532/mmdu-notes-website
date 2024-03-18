import "./message.css";
import { format } from "timeago.js";
import profile from "../../images/profile.png";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src={own && own.profilePicture ? own.profilePicture : profile}
          alt="profile picture"
        ></img>
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
