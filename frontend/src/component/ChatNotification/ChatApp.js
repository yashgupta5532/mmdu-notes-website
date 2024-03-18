// // ChatApp.js

// import React, { useState, useEffect } from "react";
// import ChatMessages from "./ChatMessages";
// import ChatInput from "./ChatInput";
// import ChatUserList from "./ChatUserList";
// import ChatNotifications from "./ChatNotifications";

// function ChatApp() {
//   const [messages, setMessages] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   const sendMessage = (text) => {
//     const newMessage = {
//       sender: currentUser,
//       text: text,
//       timestamp: new Date(),
//     };

//     // Send the new message to the server (if applicable)
//     // Update the messages state with the new message
//     setMessages([...messages, newMessage]);
//   };

//   // Logic to listen for new messages and update state
//   socket.on("newMessage", (message) => {
//     setMessages([...messages, message]);
//   });

//   // Logic to listen for user updates (e.g., join/leave)
// socket.on("userJoined", (user) => {
//     setUsers([...users, user]);
//   });
  
//   socket.on("userLeft", (userId) => {
//     setUsers(users.filter((user) => user.userId !== userId));
//   });

//   // Logic for user login/logout
// const handleLogin = (user) => {
//     setCurrentUser(user);
//   };
  
//   const handleLogout = () => {
//     setCurrentUser(null);
//   };

//   // Logic to handle chat notifications (e.g., increment count)
// const handleNewMessageNotification = () => {
//     setNotificationCount((prevCount) => prevCount + 1);
//   };
  
//   const handleNotificationClick = () => {
//     // Handle notification click (e.g., reset count or open chat)
//     setNotificationCount(0);
//   };
  
//   return (
//     <div className="chat-app">
//       <div className="chat-sidebar">
//         <ChatUserList users={users} />
//       </div>
//       <div className="chat-main">
//         <ChatNotifications socket={socket} />
//         <ChatMessages messages={messages} />
//         <ChatInput sendMessage={sendMessage} />
//       </div>
//     </div>
//   );
// }

// export default ChatApp;
