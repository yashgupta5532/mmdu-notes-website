import express from "express";
const router = express.Router();
// import Contact from "../model/ContactSchema.js";
import Contact from "../model/ContactSchema.js";

router.post("/", async (req, res) => {
  try {
    const contactData = req.body; // Assuming your form sends data as JSON
    const contact = new Contact(contactData);
    await contact.save();
    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  }
});

// Define a GET endpoint to fetch contact form submissions
router.get("/", async (req, res) => {
  try {
    // Fetch all contact form submissions from the database
    const contactSubmissions = await Contact.find().exec();
    res.status(200).json(contactSubmissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  }
});

export default router;
