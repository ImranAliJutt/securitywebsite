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

// Admin Login (pre-generated credentials)
const adminCredentials = {
  username: "admin",
  password: "12345",
};

// Admin Login Route
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (
      username === adminCredentials.username &&
      password === adminCredentials.password
  ) {
      res.status(200).json({ message: "Login successful" });
  } else {
      res.status(401).json({ message: "Invalid credentials" });
  }
});

// Fetch All Records Route
app.get("/api/admin/records", async (req, res) => {
  try {
      const records = await Contact.find();
      res.status(200).json(records);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching records" });
  }
});

// 2. Fetch all contact records
app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

// 3. Add a new contact record
app.post("/api/contacts", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: "Contact added successfully", newContact });
  } catch (error) {
    res.status(500).json({ message: "Error saving contact", error });
  }
}); 
 
// 4. Delete a contact record
app.delete("/api/contacts/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact", error });
  }
});

// 5. Update a contact record
app.put("/api/contacts/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Contact updated successfully", updatedContact });
  } catch (error) {
    res.status(500).json({ message: "Error updating contact", error });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
