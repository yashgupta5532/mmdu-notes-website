//login and registering for  a user is done here

import express from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import PasswordResetToken from "../model/passwordResetTokenSchema.js";
import User from "../model/Userschema.js";

const router = express.Router();

//register
router.post("/register", async (req, res, next) => {
  try {
    // Generate a new password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Check if a user with the provided email already exists
    const alreadyUser = await User.findOne({ email: req.body.email });
    if (alreadyUser) {
      return res.status(500).json({
        error: "User already Exists",
      });
      
    }

    // Create a new user
    const newuser = new User({
      username: req.body.username,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hashedPassword,
      institution: req.body.institution,
      desc: req.body.desc,
      profilePicture: req.body.profilePicture,
    });

    // Save the new user to the database

    const user = await newuser.save();

    // Return the user data as a response
    res.status(200).json(user);
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
});

//Login
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      // User not found
      return res.status(404).json({
        error: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      // Wrong password
      return res.status(400).json({
        error: "Wrong password",
      });
    }

    // Successful login
    res.status(200).json(user);
  } catch (err) {
    // Handle other errors (e.g., database errors)
    next(err);
  }
});

router.post("/forgot/password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const expires = Date.now() + 3600000; // Token expires in 1 hour

    // Create a password reset token record
    const resetTokenRecord = new PasswordResetToken({
      token: resetToken,
      userId: user._id,
      expires,
    });

    // Save the resetTokenRecord to the database
    await resetTokenRecord.save();
    user.resetTokens.push(resetTokenRecord.userId);
    await user.save();

    // Send a password reset email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const resetLink = `${req.headers.origin}/reset/password/${resetToken}`;

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: user.email,
      subject: "MMDU-NOTES-HUB Password Recovery",
      text: `To reset your password, click the following link: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: "Error sending email" });
      }

      return res.status(200).json({ message: "Password reset email sent" });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to reset the user's password
router.post("/reset/password/:token", async (req, res) => {
  const token = req.params.token;
  const newPassword = req.body.newPassword;

  try {
    // Find the password reset token in the database (e.g., using mongoose)
    const resetToken = await PasswordResetToken.findOne({ token });

    if (!resetToken) {
      return res.status(404).json({ error: "Token not found or expired" });
    }

    // Check if the token has expired
    if (resetToken.expires < Date.now()) {
      return res.status(400).json({ error: "Token has expired" });
    }

    // Find the user associated with the token (e.g., using mongoose)
    const user = await User.findById(resetToken.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;

    // Save the updated user in the database
    await user.save();

    // Remove the used token from the database
    await resetToken.remove();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
