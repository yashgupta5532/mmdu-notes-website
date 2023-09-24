import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";
import "./conversation.css";
import profile from "../../images/profile.png";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await publicRequest("/users/" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      
      <img
        className="conversationImg"
        src={user && user.profilePicture ? user.profilePicture : profile}
        alt="profile picture"
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
