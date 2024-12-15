import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Header.css';
import bgImage1 from '../images/securityimage2.jpeg';
import bgImage2 from '../images/securityimage2.jpg';
import bgImage3 from '../images/securityimage3.jpg';
import bgImage4 from '../images/securityimage4.jpg';

const Header = () => {
    const carouselItems = [
        { image: bgImage1, text: "General Security Services" },
        { image: bgImage2, text: "Commercial Security" },
        { image: bgImage3, text: "Event Security" },
        { image: bgImage4, text: "Mobile Patrol Security" },
    ];

    return (
        <header className="header">
            <div className="container">
                <div className="row align-items-center">
                    {/* Left Content */}
                    <div className="col-md-6">
                        <div className="header-content">
                            <h1>
                                Your Safety is
                            </h1>
                            <h1>
                                Our Top Priority <i className="fa-solid fa-stairs"></i>
                            </h1>
                            <p>
                                At Britguarding, we go beyond traditional security services. With a focus on innovation and expertise, we specialize in delivering tailored solutions such as event security, mobile patrols, and professional guard services. Our commitment is to ensure your safety and peace of mind through cutting-edge technology, highly trained personnel, and a proactive approach to risk management. Together, we create secure environments where businesses thrive and communities feel protected.
                            </p>
                            <div className="button-group">
                                <a href="#services" className="service">Our Services</a>
                                <a href="#contact" className="contact">Contact Us</a>
                            </div>
                        </div>
                    </div>

                    {/* Right Carousel */}
                    <div className="col-md-6">
                        <Carousel fade>
                            {carouselItems.map((item, index) => (
                                <Carousel.Item key={index} className="carousel-slide">
                                    <img
                                        src={item.image}
                                        alt={`Slide ${index + 1}`}
                                        className="carousel-image"
                                    />
                                    <div className="carousel-overlay">
                                        <h2 className='ctext'>{item.text}</h2>
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
