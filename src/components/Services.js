import React, { useEffect, useState, useRef } from 'react';
import './Services.css';
import servicesBg from '../images/servicesbg.jpg';

const Services = () => {
    const services = [
        {
            icon: 'fa-solid fa-user-shield',
            title: 'Security Guards',
            description: 'SIA licensed and professionally trained for Commercial security, Retail security, Event Stewarding, Car park, and other security needs.',
        },
        {
            icon: 'fa-solid fa-users',
            title: 'EVENT SECURITY',
            description: 'Let us help you with our stewarding services for exhibitions, concerts, sporting events, product launches & private parties.',
        },
        {
            icon: 'fa-solid fa-video',
            title: 'CCTV MONITORING',
            description: 'We can always watch and keep alert whenever you cannot.',
        },
        {
            icon: 'fa-solid fa-car',
            title: 'MOBILE PATROLS',
            description: 'SR Security Services provides mobile patrol and emergency services at cost-effective and competitive rates.',
        },
        {
            icon: 'fa-solid fa-bell',
            title: 'ALARM RESPONSE',
            description: 'High standard and professional Alarm Response and Keyholding Services.',
        },
        {
            icon: 'fa-solid fa-people-group',
            title: 'TEAM',
            description: 'A dedicated and highly trained team ready to meet all your security and event needs with exceptional professionalism.',
        },
    ];

    const [visibleCards, setVisibleCards] = useState([]);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleCards((prevVisible) => {
                            const index = Number(entry.target.dataset.index);
                            if (!prevVisible.includes(index)) {
                                return [...prevVisible, index];
                            }
                            return prevVisible;
                        });
                    }
                });
            },
            { threshold: 0.2 } // Trigger when 20% of the card is visible
        );

        const cards = document.querySelectorAll('.services-sec-card');
        cards.forEach((card, index) => {
            card.dataset.index = index;
            observer.observe(card);
        });

        return () => {
            cards.forEach((card) => observer.unobserve(card));
        };
    }, []);

    return (
        <section
            className="services-sec"
            style={{ backgroundImage: `url(${servicesBg})` }}
            ref={sectionRef}
        >
            <div className="services-sec-overlay"></div>
            <div className="services-sec-container">
                <h2 className={`services-sec-title ${visibleCards.length > 0 ? 'visible' : ''}`}>
                    <i
                        className="fa-solid fa-bars-staggered"
                        style={{
                            background:' #3C3D37',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                        }}
                    ></i>{' '}
                    Our Company Services
                </h2>
                <p className={`services-sec-description ${visibleCards.length > 0 ? 'visible' : ''}`}>
                    We provide tailored, professional, and reliable services to meet your security and event management needs, ensuring safety and peace of mind.
                </p>
                <div className="services-sec-grid">
                    {services.map((service, index) => (
                        <div
                            className={`services-sec-card ${visibleCards.includes(index) ? 'visible' : ''}`}
                            key={index}
                        >
                            <div className="services-sec-icon">
                                <i className={service.icon}></i>
                            </div>
                            <h3 className="services-sec-card-title">{service.title}</h3>
                            <p className="services-sec-card-description">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
