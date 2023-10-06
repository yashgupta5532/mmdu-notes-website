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
import contactroute from "./routes/contact.js";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT; // Use a default port if PORT is not defined

const URL = process.env.URL;

connection(URL);

// Enable CORS
app.use(
  cors({
    origin: "*", // You might want to configure this for a specific origin in production
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization", "sessionId"],
    exposedHeaders: ["sessionId"],
    credentials: true, // Set to true if you need to send credentials with requests
    preflightContinue: false,
  })
);

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const __dirname = path.resolve();

// Serve static images from the 'public/images' directory
app.use(
  "/images",
  express.static(path.join(__dirname, "public/images"), {
    setHeaders: function (res, path) {
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

// Define routes
app.use("/api/users", useRoute);
app.use("/api/auth", authRoute);
app.use("/api/notes", noteroute);
app.use("/api/comments", commentroute);
app.use("/api/conversations", conversationroute);
app.use("/api/messages", messageroute);
app.use("/api/contact", contactroute);

// Define a route for the home page
app.get("/", (req, res, next) => {
  try {
    res.status(200).json("Welcome to Home Page");
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
