import React, { useEffect, useState, useRef } from 'react';
import './AboutUs.css';
import aboutUsImage from '../images/securitywomen.jpg';

const AboutUs = () => {
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    // State for countdown values
    const [counts, setCounts] = useState({
        happyClients: 0,
        projectsDone: 0,
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            },
            { threshold: 0.2 } // Trigger when 20% of the section is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Animate the counters when the section is visible
    useEffect(() => {
        if (visible) {
            const targetCounts = { happyClients: 500, projectsDone: 1200 };
            const increment = 20; // Speed of increment
            const duration = 2000; // Animation duration in ms
            const steps = duration / increment;

            let currentCounts = { happyClients: 0, projectsDone: 0 };

            const interval = setInterval(() => {
                currentCounts.happyClients += Math.ceil(targetCounts.happyClients / steps);
                currentCounts.projectsDone += Math.ceil(targetCounts.projectsDone / steps);

                setCounts({
                    happyClients: Math.min(currentCounts.happyClients, targetCounts.happyClients),
                    projectsDone: Math.min(currentCounts.projectsDone, targetCounts.projectsDone),
                });

                if (
                    currentCounts.happyClients >= targetCounts.happyClients &&
                    currentCounts.projectsDone >= targetCounts.projectsDone
                ) {
                    clearInterval(interval);
                }
            }, increment);

            return () => clearInterval(interval);
        }
    }, [visible]);

    return (
        <section
            className={`about-us ${visible ? 'visible' : ''}`}
            ref={sectionRef}
        >
            <div className="about-us-overlay"></div>
            <div className="about-us-container">
                <div className="about-us-content">
                    <h2 className="about-us-title">
                    ABOUT US
                    </h2>
                    <p className="about-us-description">
                        At <strong>BritGuarding</strong>, we are dedicated to providing top-tier security services with a focus on professionalism, reliability, and innovation. Our team of highly trained experts is committed to ensuring the safety and well-being of our clients across various industries.
                    </p>
                    <p className="about-us-description">
                        With years of experience, we have built a reputation for delivering customized security solutions tailored to meet unique client needs. Our vision is to create a secure environment where businesses and communities can thrive with peace of mind.
                    </p>
                    <div className="about-us-metrics">
                        <div className="metric">
                            <h3>{counts.happyClients}</h3>
                            <p>HAPPY CLIENTS</p>
                        </div>
                        <div className="metric">
                            <h3>{counts.projectsDone}</h3>
                            <p>PROJECTS DONE</p>
                        </div>
                    </div>
                    <button className="about-us-btn">Learn More</button>
                </div>
                <div className="about-us-image-container">
                    <img src={aboutUsImage} alt="About Us" className="about-us-image" />
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
