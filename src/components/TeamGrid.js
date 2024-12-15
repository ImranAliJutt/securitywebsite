import React from "react";
import "./TeamGrid.css";
import directorImage from "../images/securityimage1.jpg";
import headImage from "../images/securityimage1.jpg";
import managerImage from "../images/securityimage1.jpg";
import hrImage from "../images/securityimage1.jpg";
import analystImage from "../images/imran.jpeg";
import teamImage from "../images/securityimage1.jpg";

const teamMembers = [
    { name: "John Smith", role: "Director", description: "Responsible for overall leadership and strategy.", image: directorImage },
    { name: "Jane Doe", role: "Head", description: "Manages day-to-day operations and team cohesion.", image: headImage },
    { name: "Michael Brown", role: "Operational Manager", description: "Ensures smooth operational workflows.", image: managerImage },
    { name: "Sarah Johnson", role: "HR", description: "Oversees talent acquisition and employee well-being.", image: hrImage },
    { name: "Imran Ali", role: "Technical Analyst", description: "Provides insights into technical challenges.", image: analystImage },
    { name: "Team Alpha", role: "Team Members", description: "Dedicated professionals ensuring project success.", image: teamImage },
    { name: "Chris Evans", role: "Technical Analyst", description: "Provides insights into technical challenges.", image: analystImage },
    { name: "Team Alpha", role: "Team Members", description: "Dedicated professionals ensuring project success.", image: teamImage },
];

const TeamGrid = () => {
    return (
        <section className="team-grid-section">
            <div className="container">
                <h2 className="team-grid-title">MEET OUR TEAM</h2>
                <p className="team-grid-description">
                    Our team is the cornerstone of our success, bringing together a diverse group of highly skilled professionals dedicated to excellence. From strategic leadership to technical analysis, human resources, and operational management, each member plays a crucial role in delivering unparalleled security solutions. With a shared commitment to innovation, collaboration, and precision, we work tirelessly to ensure your safety and peace of mind. Together, we form a cohesive unit, driven by passion and purpose to meet the unique challenges of every project we undertake.
                </p>
                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <div className="team-grid-card" key={index}>
                            <img src={member.image} alt={member.name} className="team-grid-image" />
                            <div className="team-grid-info">
                                <h3 className="team-grid-name">{member.name}</h3>
                                <p className="team-grid-role">{member.role}</p>
                                <p className="team-grid-description">{member.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamGrid;
