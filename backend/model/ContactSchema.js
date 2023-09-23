import mongoose from 'mongoose'
import validator from "validator"

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: "Please enter a valid email",
    },
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  contactNo: {
    type: Number,
    unique: true,
    validate: {
      validator: (value) => {
        return /^\d{10}$/.test(value);
      },
      message: "Enter a valid Contact number",
    },
  },
  message: {
    type: String,
  },
},
{ timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;