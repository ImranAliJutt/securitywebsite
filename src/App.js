import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Ensure proper imports
import './App.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Map from './components/Map';
import TeamGrid from './components/TeamGrid';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Header />
        <Services />
        <ContactUs />
        <AboutUs />
        <Projects />
        <TeamGrid />
        <Map />
        <Footer />
        <Routes>
          <Route path="/services" element={<Services />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="projects" element={<Projects />} />
          <Route path="footer" element={<Footer />} />
          <Route path="map" element={<Map />} />
          <Route path="team" element={<TeamGrid />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
