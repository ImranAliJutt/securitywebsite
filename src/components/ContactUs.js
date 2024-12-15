import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
    return (
        <section className="contact-section">
            <div className="container">
                <div className="row">
                    {/* Left Column - Contact Information */}
                    <div className="col-md-6 contact-info">
                        <h2>GET IN TOUCH</h2>
                        <p>
    We're always on the lookout to collaborate with new clients and partners. Whether you need expert security solutions, customized services, or have a unique project in mind, our team is ready to assist. If you're interested in working with us, please get in touch through one of the following ways.
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
                            <div className="detail-item">
                                <i className="fa-solid fa-clock"></i>
                                <div>
                                    <h4>Opening Hours</h4>
                                    <p>
                                        <strong>Mon - Fri:</strong> 9am - 5pm <br />
                                        <strong>Sat - Sun:</strong> 9am - 2pm
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="col-md-6 contact-form">
                        <h2>CONTACT US</h2>
                        <form>
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input type="text" placeholder="Enter your name" required />
                            </div>
                            <div className="form-row">
                                <div className="form-group col">
                                    <label>Email *</label>
                                    <input type="email" placeholder="Enter your email" required />
                                </div>
                                <div className="form-group col">
                                    <label>Phone Number</label>
                                    <input type="tel" placeholder="Enter your phone number" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Subject *</label>
                                <input type="text" placeholder="Enter subject" required />
                            </div>
                            <div className="form-group">
                                <label>Message *</label>
                                <textarea placeholder="Enter your message" rows="4" required></textarea>
                            </div>
                            <button type="submit" className="send-btn">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
