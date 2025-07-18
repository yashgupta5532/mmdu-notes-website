import mongoose from 'mongoose'
import validator from "validator"

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    interested:{
      type: String,
    },
    email: {
      type: String,
      required: true, 
      unique: true,
      validate: [validator.isEmail, "Not a valid email"],
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    institution: {
        type: String,
        max: 50,
      },
    notes:{
      type:Array,
      default:[],
    },
    resetTokens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PasswordResetToken' }],
  },
  { timestamps: true }
);

const  User =mongoose.model("User", UserSchema);

export default User ;