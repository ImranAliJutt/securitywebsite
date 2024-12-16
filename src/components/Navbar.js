import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './Navbar.css';
import logo from '../images/logo.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`navbar navbar-expand-lg fixed-top ${
                isScrolled ? 'scrolled' : ''
            }`}
        >
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="BritGuarding" />
                    BritGuarding
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about-us">
                                About Us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/services">
                                Services
                            </Link>
                        </li>
                    </ul>
                    <div className="contact-button-container">
                        <Link to="/contact-us" className="A-0">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
