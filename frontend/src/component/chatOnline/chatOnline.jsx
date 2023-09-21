import axios from "axios";
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";
import "./chatOnline.css";
import profile from '../../images/profile.png'

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [notificationCounts, setNotificationCounts] = useState({});

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await publicRequest.get(`/users/friends/${currentId}`);
        setFriends(res.data);
        console.log("Friend  ->",friends);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    console.log("OnlineFriend  ->",onlineFriends);
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(`/conversations/find/${currentId}/${user._id}`);
      setCurrentChat(res.data);

      // Reset the notification count when a chat is opened
      setNotificationCounts({
        ...notificationCounts,
        [user._id]: 0,
      });
    } catch (err) {
      console.error("Error opening chat:", err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.length === 0 ? (
        <div className="online" style={{ textAlign: "center", font: "300 1.3rem sans-serif" }}>
          No Online Friends Now
        </div>
      ) : (
        onlineFriends.map((o) => (
          <div className="chatOnlineFriend" key={o._id} onClick={() => handleClick(o)}>
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src={o?.profilePicture ? o.profilePicture : profile}
                alt="Profile-image"
              />
              {notificationCounts[o._id] > 0 && (
                <div className="chatOnlineBadge">{notificationCounts[o._id]}</div>
              )}
            </div>
            <span className="chatOnlineName">{o?.username}</span>
          </div>
        ))
      )}
    </div>
  );
}
