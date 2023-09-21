const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = require("socket.io")(server, { cors: { origin: "*" } }); // Initialize Socket.IO

const router = require("./router"); // Import the router

app.use(cors());
app.use(router); // Use the router in your Express app

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  console.log(userId + "->" + socketId);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  //take userId and socketId from the user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log("A user connected.");
    io.emit("getUsers", users);
  });

  //send and get messages
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    console.log(text);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT || 8900, () =>
  console.log(`Server has started.`)
);
