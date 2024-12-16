const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;