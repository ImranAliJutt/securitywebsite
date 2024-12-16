import React, { useState, useEffect } from "react";
import "./AdminPanel.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons

const AdminPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contacts, setContacts] = useState([]); // State to store contact records
  const [editingContact, setEditingContact] = useState(null); // State to handle editing
  const [updatedContact, setUpdatedContact] = useState({}); // State for updates

  // Login Functionality
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "12345") {
      setMessage("Login successful!");
      setIsLoggedIn(true);
      fetchContacts(); // Fetch contact data on successful login
    } else {
      setMessage("Invalid credentials! Please try again.");
      setIsLoggedIn(false);
    }
  };

  // Fetch Contacts
  const fetchContacts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/contacts`);
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Delete Contact
  const handleDelete = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/contacts/${id}`, {
        method: "DELETE",
      });
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  // Start Editing Contact
  const handleEdit = (contact) => {
    setEditingContact(contact._id);
    setUpdatedContact(contact);
  };

  // Update Contact
  const handleUpdate = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContact),
      });
      setEditingContact(null);
      fetchContacts();
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  return (
    <div
      className="admin-panel-container"
      style={{
        backgroundColor: "#181C14",
        minHeight: "100vh",
        color: "#fff",
        padding: "20px",
      }}
    >
      {!isLoggedIn ? (
        // Login Form
        <div className="login-card">
          <h2 className="text-center mb-4">Admin Panel</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-success w-100">Login</button>
          </form>
          {message && <p className="text-center mt-3">{message}</p>}
        </div>
      ) : (
        // Contacts Table
        <div>
          <h2 className="text-center mb-4">Welcome, Admin!</h2>
          <h3 className="mb-3">Fetched Contact Records</h3>
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  {editingContact === contact._id ? (
                    <>
                      <td>
                        <input
                          value={updatedContact.fullName || ""}
                          onChange={(e) =>
                            setUpdatedContact({ ...updatedContact, fullName: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          value={updatedContact.email || ""}
                          onChange={(e) =>
                            setUpdatedContact({ ...updatedContact, email: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          value={updatedContact.phone || ""}
                          onChange={(e) =>
                            setUpdatedContact({ ...updatedContact, phone: e.target.value })
                          }
                        />
                      </td>
                      <td colSpan="2">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleUpdate(contact._id)}
                        >
                          Save
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{contact.fullName}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                      <td>{contact.subject}</td>
                      <td>{contact.message}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => handleEdit(contact)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(contact._id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
