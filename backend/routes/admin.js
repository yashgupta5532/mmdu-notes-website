// import express from "express";
// import Note from "../model/Noteschema.js";
// const router = express.Router();

// //new admin features
// // Get all pending notes
// router.get("/pending", async (req, res) => {
//     try {
//       const pendingNotes = await Note.find({ status: "Pending" }).populate(
//         "userId"
//       );
//       res.json(pendingNotes);
//     } catch (error) {
//       res.status(500).json({ error: "Internal server error" });
//     }
//   });  

// // Approve a note
// router.put("/approve/:id", async (req, res) => {
//   try {
//     await Note.findByIdAndUpdate(req.params.id, { status: "Approved" });
//     res.json({ message: "Note approved successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Reject a note
// router.put("/reject/:id", async (req, res) => {
//   try {
//     await Note.findByIdAndUpdate(req.params.id, { status: "Rejected" });
//     res.json({ message: "Note rejected successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// export default router;
