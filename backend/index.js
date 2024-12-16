const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load environment variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// MongoDB Connection
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

// Define a Schema and Model for the Contact Form
const contactSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phoneNumber: String,
  subject: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// Default Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Route to Fetch Data from MongoDB (GET)
app.get("/api/data", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

// Route to Submit Contact Form (POST)
app.post("/api/contact", async (req, res) => {
  try {
    const { fullName, email, phoneNumber, subject, message } = req.body;

    const newContact = new Contact({
      fullName,
      email,
      phoneNumber,
      subject,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: "Contact saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving contact" });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
