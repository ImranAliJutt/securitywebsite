const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:3000",             // Local frontend
    "https://securitywebsite.onrender.com" // Deployed frontend URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Ensure OPTIONS is allowed
  allowedHeaders: ["Content-Type", "Authorization"]     // Allow headers for JSON
}));

app.use(express.json()); // Parse JSON requests

// Test Route to Confirm CORS
app.options("/api/contact", (req, res) => {
  res.status(200).send("Preflight successful");
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// POST Route for Contact Form
app.post("/api/contact", async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newContact = new Contact({
      fullName,
      email,
      phone,
      subject,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: "Contact saved successfully" });
  } catch (error) {
    console.error("Error saving contact:", error.message);
    res.status(500).json({ message: "Error saving contact", error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
