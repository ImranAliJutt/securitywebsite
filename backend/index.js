const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Contact = require("./models/Contact");

const app = express();

// Middleware: Enable CORS for all routes
app.use(cors({
  origin: [
    "http://localhost:3000",               // Local frontend
    "https://securitywebsite.onrender.com" // Deployed frontend URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://securitywebsite.onrender.com", // Correct frontend origin
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Debugging CORS preflight
app.options("*", cors()); // Allow OPTIONS method globally

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running!");
});


// Route to fetch all contacts
app.use("/api/contacts", require("./routes/contactRoutes"));



// POST Route for Contact Submission
app.post("/api/contact", async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    // Validation
    if (!fullName || !email || !subject || !message) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    // Save Contact
    const newContact = new Contact({ fullName, email, phone, subject, message });
    await newContact.save();

    res.status(201).json({ message: "Contact saved successfully!" });
  } catch (error) {
    console.error("Error saving contact:", error.message);
    res.status(500).json({
      message: "Error saving contact",
      error: error.message,
    });
  }
});

// Route to fetch all contacts
app.use("/api/contacts", require("./routes/contactRoutes"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
