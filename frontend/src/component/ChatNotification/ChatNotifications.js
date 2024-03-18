// // ChatNotifications.js
// import React, { useState, useEffect } from "react";

// const ChatNotifications = ({ socket }) => {
//   const [notificationCount, setNotificationCount] = useState(0);

//   useEffect(() => {
//     socket.on("newMessageNotification", () => {
//       // Increment the notification count when a new message arrives
//       setNotificationCount((prevCount) => prevCount + 1);
//     });
//   }, [socket]);

//   const handleNotificationClick = () => {
//     // Handle notification click (e.g., reset count or open chat)
//     setNotificationCount(0);
//   };

//   return (
//     <div>
//       {/* Display notification count */}
//       {notificationCount > 0 && (
//         <div onClick={handleNotificationClick}>
//           You have {notificationCount} new messages (Click to view)
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatNotifications;
