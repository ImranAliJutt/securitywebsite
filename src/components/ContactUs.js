import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [statusMessage, setStatusMessage] = useState(''); // For success/error messages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage(''); // Reset the status message
        try {
          const response = await fetch(
            "https://securitywebsitebackend.onrender.com/api/contact", // Hardcode temporarily for testing
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            }
          );
      
          if (response.ok) {
            const data = await response.json();
            console.log('Success:', data);
            setStatusMessage('Message sent successfully!');
            setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
          } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
            setStatusMessage('Error saving contact');
          }
        } catch (error) {
          console.error('Error submitting form:', error.message);
          setStatusMessage('Error connecting to server');
        }
      };
      

    return (
        <section className="contact-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 contact-info">
                        <h2>GET IN TOUCH</h2>
                        <p>
                            We're always on the lookout to collaborate with new clients and partners. If you're interested in working with us, please get in touch.
                        </p>
                        <div className="contact-details">
                            <div className="detail-item">
                                <i className="fa-solid fa-location-dot"></i>
                                <div>
                                    <h4>Address</h4>
                                    <p>8014 Edith Blvd NE, Albuquerque, New York, United States</p>
                                </div>
                            </div>
                            <div className="detail-item-row">
                                <div className="detail-item">
                                    <i className="fa-solid fa-phone"></i>
                                    <div>
                                        <h4>Phone</h4>
                                        <p>(505) 792-2430</p>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <i className="fa-solid fa-envelope"></i>
                                    <div>
                                        <h4>Email</h4>
                                        <p>demo@yourdomain.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 contact-form">
                        <h2>CONTACT US</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter your name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group col">
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Subject *</label>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Enter subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Message *</label>
                                <textarea
                                    name="message"
                                    placeholder="Enter your message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="send-btn">
                                Send Message
                            </button>
                        </form>
                        {/* Success or Error Message */}
                        {statusMessage && (
                            <p className={statusMessage.includes('Error') ? 'error-message' : 'success-message'}>
                                {statusMessage}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
