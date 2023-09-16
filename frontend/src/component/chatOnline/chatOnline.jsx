import axios from "axios";
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";
import "./chatOnline.css";
import profile from '../../images/profile.png'

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [notificationCounts, setNotificationCounts] = useState({}); // State to store notification counts for each friend

  useEffect(() => {
    const getFriends = async () => {
      const res = await publicRequest.get("/users");
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);

      // Reset the notification count when a chat is opened
      setNotificationCounts({
        ...notificationCounts,
        [user._id]: 0,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Function to increment the notification count for a specific user
  const incrementNotificationCount = (userId) => {
    setNotificationCounts({
      ...notificationCounts,
      [userId]: (notificationCounts[userId] || 0) + 1,
    });
  };

  return (
    <div className="chatOnline">
      {onlineFriends.length === 0 ? (
        <div className="online" style={{ textAlign: "center", font: "600 1.3rem sans-serif", color: "red" }}>
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
