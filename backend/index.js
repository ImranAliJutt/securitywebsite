const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Mongoose Schema for Contact Form
const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: { type: String, required: true },
  message: { type: String, required: true },
});

const Contact = mongoose.model("Contact", contactSchema);

// Routes
const PORT = process.env.PORT || 5000;

// Default Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// GET Data Route
app.get("/api/data", (req, res) => {
  res.json([
    { id: 1, name: "Alice", role: "developer" },
    { id: 2, name: "Bob", role: "designer" },
    { id: 3, name: "Imran Ranjha", role: "manager" },
  ]);
});

// POST Contact Form Data Route
app.post("/api/contact", async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    // Create a new contact instance
    const newContact = new Contact({
      fullName,
      email,
      phone,
      subject,
      message,
    });

    // Save to MongoDB
    await newContact.save();

    res.status(201).json({ message: "Contact saved successfully" });
  } catch (error) {
    console.error("Error saving contact:", error.message);
    res.status(500).json({ message: "Error saving contact" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
