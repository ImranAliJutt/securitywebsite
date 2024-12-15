import React from "react";
import "./Projects.css";
import eventsecurity from "../images/eventsecurity.jpg";
import mobilepatrol from "../images/mobilepetrol.jpg";
import security from "../images/seurityimage.jpg";
import securityimage from "../images/securityimage1.jpg";
import securityimage2 from "../images/securityimage2.jpg";
import securityimage3 from "../images/securityimage3.jpg";
import securityimage4 from "../images/securityimage4.jpg";

const projects = [
  {
    id: 1,
    title: "Event Security",
    description: "Providing top-tier security for high-profile events.",
    image: eventsecurity,
    link: "#",
  },
  {
    id: 2,
    title: "Mobile Patrol",
    description: "Ensuring safety through mobile security services.",
    image: mobilepatrol,
    link: "#",
  },
  {
    id: 3,
    title: "CCTV Monitoring",
    description: "24/7 advanced surveillance for peace of mind.",
    image: security,
    link: "#",
  },
  {
    id: 4,
    title: "Access Control",
    description: "Managing access to ensure authorized entry only.",
    image: securityimage,
    link: "#",
  },
  {
    id: 5,
    title: "Event Security",
    description: "Providing top-tier security for high-profile events.",
    image: securityimage2,
    link: "#",
  },
  {
    id: 6,
    title: "Mobile Patrol",
    description: "Ensuring safety through mobile security services.",
    image: securityimage3,
    link: "#",
  },
  {
    id: 7,
    title: "CCTV Monitoring",
    description: "24/7 advanced surveillance for peace of mind.",
    image: security,
    link: "#",
  },
  {
    id: 8,
    title: "Access Control",
    description: "Managing access to ensure authorized entry only.",
    image: securityimage4,
    link: "#",
  },
];

const steps = [
  { id: 1, title: "Consultation", description: "Understanding your security needs." },
  { id: 2, title: "Planning", description: "Developing a custom security strategy." },
  { id: 3, title: "Implementation", description: "Deploying trained professionals and technology." },
  { id: 4, title: "Monitoring", description: "Ensuring safety through continuous oversight." },
  
  
];

const Projects = () => {
  return (
    <>
      {/* Projects Section */}
      <section className="projects-section">
        <div className="projects-overlay"></div>
        <div className="projects-container">
          <h2 className="projects-title">OUR PROJECTS</h2>
          <p className="projects-description">
            Explore our featured projects that showcase our expertise and commitment to excellence.
          </p>
          <div className="projects-grid">
            {projects.map((project) => (
              <div className="project-card" key={project.id}>
                <img src={project.image} alt={project.title} className="project-image" />
                <div className="project-details">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <a href={project.link} className="project-link">
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default Projects;
