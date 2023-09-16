import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connection from "./database/db.js";
import morgan from "morgan";
import helmet from "helmet";
import multer from "multer";
import path from "path";

import useRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import noteroute from "./routes/notes.js";
import commentroute from "./routes/comment.js";
import conversationroute from "./routes/conversation.js";
import messageroute from "./routes/message.js";

import cors from "cors";
const app = express();
dotenv.config();

const port = process.env.PORT;

const URL = process.env.URL;

connection(URL);

// Handle CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization", "sessionId"],
    exposedHeaders: ["sessionId"],
    preflightContinue: false,
  })
);

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const __dirname = path.resolve();
app.use(
  "/images",
  express.static(path.join(__dirname, "public/images"), {
    setHeaders: function (res, path) {
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

app.use("/api/users", useRoute);
app.use("/api/auth", authRoute);
app.use("/api/notes", noteroute);
app.use("/api/comments", commentroute);
app.use("/api/conversations", conversationroute);
app.use("/api/messages", messageroute);

app.get("/", (req, res, next) => {
  try {
    // res.send("welcome to home page");
    res.status(200).json("Welcome to Home Page");
  } catch (error) {
    // Handle errors here and send an appropriate response
    next(error); // Pass the error to the error handling middleware
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error

  // Handle errors and send an error response to the client
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
