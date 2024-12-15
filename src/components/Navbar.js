import React, { useState, useEffect } from 'react';
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
                <a className="navbar-brand" href="#">
                    <img src={logo} alt="BritGuarding" />
                    BritGuarding
                </a>
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
                            <a className="nav-link" href="#home">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#about">
                                About Us
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#about">
                                Join us
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#services">
                                Services
                            </a>
                        </li>
                        
                    </ul>
                    <div className="contact-button-container">
                        <a href="/contact-us" className="A-0">Contact Us</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
