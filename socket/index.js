const http = require("http");
const express = require("express");
const cors = require("cors");
const router = require("./router");
const app = express();
const server = http.createServer(app);

app.use(router);


// import socketIOClient from "socket.io-client";
// const socket = socketIOClient("http://localhost:8900"); // Replace with your server URL

const io = require("socket.io")(server, { cors: { origin: "*" } });

let users = [];


// Create an object to store notification counts for each user
const notificationCounts = {};

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  console.log(userId + "->" + socketId);
  alert();
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log("a user connected.");
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    console.log(text);

    // Increment the notification count for the recipient
    if (!notificationCounts[receiverId]) {
      notificationCounts[receiverId] = 1;
    } else {
      notificationCounts[receiverId]++;
    }

    // Emit a notification event to the recipient
    io.to(user.socketId).emit("newMessageNotification", {
      senderId,
      notificationCount: notificationCounts[receiverId],
    });

    // Emit the message to the recipient
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(8900, () =>
  console.log(`Server has started.`)
);
