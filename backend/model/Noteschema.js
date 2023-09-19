import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    price: {
      type: Number,
    },
    notename: {
      type: String,
      maxlength: 15, // Corrected the property name to "maxlength"
    },
    desc: {
      type: String,
      maxlength: 500, // Corrected the property name to "maxlength"
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    thumbnailfilename: {
      type: String,
    },
    notefilename: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    buy: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);
export default Note;
