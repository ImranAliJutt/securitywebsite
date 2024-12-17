const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// Fetch all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find(); // Fetch all contact documents
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error.message);
    res.status(500).json({ message: "Error fetching contacts", error: error.message });
  }
});

// Add new contact
router.post("/", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: "Contact saved successfully", newContact });
  } catch (error) {
    console.error("Error saving contact:", error.message);
    res.status(500).json({ message: "Error saving contact", error: error.message });
  }
});

// Delete contact
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error.message);
    res.status(500).json({ message: "Error deleting contact", error: error.message });
  }
});

// Update contact
router.put("/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Contact updated successfully", updatedContact });
  } catch (error) {
    console.error("Error updating contact:", error.message);
    res.status(500).json({ message: "Error updating contact", error: error.message });
  }
});

module.exports = router;
