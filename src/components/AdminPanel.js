import React, { useState, useEffect } from "react";
import "./AdminPanel.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash, FaEye, FaUserFriends, FaBriefcase } from "react-icons/fa";

const JobApplications = () => (
  <div>
    <h3 className="text-center">Job Applications</h3>
    <p>No job applications available yet.</p>
  </div>
);

const AdminPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [currentSection, setCurrentSection] = useState("contacts");
  const [stats, setStats] = useState({ contactsCount: 0, applicationsCount: 0 });
  const [editingContact, setEditingContact] = useState(null);
  const [updatedContact, setUpdatedContact] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Login Functionality
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "12345") {
      setMessage("Login successful!");
      setIsLoggedIn(true);
      fetchContacts();
    } else {
      setMessage("Invalid credentials! Please try again.");
    }
  };

  // Fetch Contacts and Stats
  const fetchContacts = async () => {
    try {
      const response = await fetch(
        "https://securitywebsitebackend.onrender.com/api/contacts"
      );
      if (!response.ok) throw new Error("Failed to fetch contacts");
      const data = await response.json();
      setContacts(data);
      setStats((prev) => ({ ...prev, contactsCount: data.length }));
    } catch (error) {
      console.error("Error fetching contacts:", error.message);
    }
  };

  // Delete Contact
  const handleDelete = async (id) => {
    try {
      await fetch(
        `https://securitywebsitebackend.onrender.com/api/contacts/${id}`,
        { method: "DELETE" }
      );
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error.message);
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
      await fetch(
        `https://securitywebsitebackend.onrender.com/api/contacts/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedContact),
        }
      );
      setEditingContact(null);
      fetchContacts();
    } catch (error) {
      console.error("Error updating contact:", error.message);
    }
  };

  // Show Full Details in Popup
  const handleView = (contact) => {
    setSelectedContact(contact);
    setShowPopup(true);
  };

  return (
    <div className="admin-panel-container d-flex" style={{ minHeight: "110vh" }}>
      {!isLoggedIn ? (
        // Login Form
        <div className="login-card m-auto">
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
        <>
          {/* Sidebar */}
          <div className="sidebar bg-dark text-white p-3" style={{ width: "250px" , height: "92vh"}}>
            <h3 className="text-center mb-4" style={{color:'#697565'}}>Admin Panel</h3>
            <ul className="nav flex-column">
              <li
                className={`nav-item p-2 ${
                  currentSection === "contacts" && "bg-secondary"
                }`}
                onClick={() => setCurrentSection("contacts")}
                style={{ cursor: "pointer" }}
              >
                Contacts
              </li>
              <li
                className={`nav-item p-2 ${
                  currentSection === "applications" && "bg-secondary"
                }`}
                onClick={() => setCurrentSection("applications")}
                style={{ cursor: "pointer" }}
              >
                Job Applications
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="main-content p-4 w-100">
            <div className="stats-card mb-4 d-flex justify-content-around">
              <div className="card p-3 bg-info text-white text-center">
                <FaUserFriends size={40} />
                <h5>Total Contact</h5>
                <h3>{stats.contactsCount}</h3>
              </div>
              <div className="card p-3 bg-warning text-white text-center">
                <FaBriefcase size={40} />
                <h5>Job Applications</h5>
                <h3>{stats.applicationsCount}</h3>
              </div>
            </div>

            {currentSection === "contacts" ? (
              <div>
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
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={updatedContact.fullName || ""}
                                  onChange={(e) =>
                                    setUpdatedContact({ ...updatedContact, fullName: e.target.value })
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="email"
                                  className="form-control form-control-sm"
                                  value={updatedContact.email || ""}
                                  onChange={(e) =>
                                    setUpdatedContact({ ...updatedContact, email: e.target.value })
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={updatedContact.phone || ""}
                                  onChange={(e) =>
                                    setUpdatedContact({ ...updatedContact, phone: e.target.value })
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={updatedContact.subject || ""}
                                  onChange={(e) =>
                                    setUpdatedContact({ ...updatedContact, subject: e.target.value })
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={updatedContact.message || ""}
                                  onChange={(e) =>
                                    setUpdatedContact({ ...updatedContact, message: e.target.value })
                                  }
                                />
                              </td>
                              <td>
                                <button
                                  className="btn btn-success btn-sm me-2"
                                  onClick={() => handleUpdate(contact._id)}
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-secondary btn-sm"
                                  onClick={() => setEditingContact(null)}
                                >
                                  Cancel
                                </button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>{contact.fullName}</td>
                              <td>{contact.email}</td>
                              <td>{contact.phone}</td>
                              <td>{contact.subject}</td>
                              <td>{contact.message.split(" ").slice(0, 20).join(" ")}...</td>
                              <td>
                                <button
                                  className="btn btn-primary btn-sm me-2"
                                  onClick={() => handleEdit(contact)}
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  className="btn btn-danger btn-sm me-2"
                                  onClick={() => handleDelete(contact._id)}
                                >
                                  <FaTrash />
                                </button>
                                <button
                                  className="btn btn-info btn-sm"
                                  onClick={() => handleView(contact)}
                                >
                                  <FaEye />
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>

                </table>

                {/* Popup Modal for Viewing Details */}
                {showPopup && selectedContact && (
                  <div className="modal show d-block bg-dark bg-opacity-75">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Contact Details</h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowPopup(false)}
                          ></button>
                        </div>
                        <div className="modal-body">
                          <p><strong>Name:</strong> {selectedContact.fullName}</p>
                          <p><strong>Email:</strong> {selectedContact.email}</p>
                          <p><strong>Phone:</strong> {selectedContact.phone}</p>
                          <p><strong>Subject:</strong> {selectedContact.subject}</p>
                          <p><strong>Message:</strong> {selectedContact.message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <JobApplications />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
