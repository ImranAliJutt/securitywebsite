import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import logo from '../images/logo.png';
import './Secondnavbar.css';

const SecondNavbar = () => {
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
            className={`navbar navbar-expand-lg fixed-top py-3`}
            style={{
                backgroundColor: isScrolled ? 'white' : 'white',
                transition: '0.5s',
            }}
        >
            <div className="container">
                {/* Logo and Branding */}
                <Link className="navbar-brand" to="/">
                    <img
                        src={logo}
                        alt="BritGuarding"
                        style={{ height: '40px', marginRight: '10px' }}
                    />
                    <span style={{ color: 'black' }}>BritGuarding</span>
                </Link>

                {/* Mobile Menu Button */}
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

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                       
                    </ul>

                    {/* Home Button */}
                    <div className="contact-button-containersss ms-auto">
                        <Link
                            to="/"
                            >
                            Home 
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default SecondNavbar;
