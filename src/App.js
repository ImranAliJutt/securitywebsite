import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Proper imports
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Header from './components/Header';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Projects from './components/Projects';
import Map from './components/Map';
import TeamGrid from './components/TeamGrid';
import MyComponent from './components/MyComponent';
import DataComponent from './components/DataComponent';
import AdminPanel from './components/AdminPanel'; // Import Admin Panel Component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home Route - Display Everything */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Header />
                <Services />
                <AboutUs />
                <ContactUs />
                <Projects />
                <TeamGrid />
                <Map />
                <Footer />
                <h1>Welcome to Security Website</h1>
                <DataComponent />
              </>
            }
          />

          {/* Contact Us Route - Navbar + ContactUs + Footer */}
          <Route
            path="/contact-us"
            element={
              <>
                <Navbar />
                <ContactUs />
                <Footer />
              </>
            }
          />

          {/* Services Route - Navbar + Services + Footer */}
          <Route
            path="/services"
            element={
              <>
                <Navbar />
                <Services />
                <Footer />
              </>
            }
          />

          {/* About Us Route - Navbar + AboutUs + Footer */}
          <Route
            path="/about-us"
            element={
              <>
                <Navbar />
                <AboutUs />
                <Footer />
              </>
            }
          />

          {/* Projects Route - Navbar + Projects + Footer */}
          <Route
            path="/projects"
            element={
              <>
                <Navbar />
                <Projects />
                <Footer />
              </>
            }
          />

          {/* Map Route - Navbar + Map + Footer */}
          <Route
            path="/map"
            element={
              <>
                <Navbar />
                <Map />
                <Footer />
              </>
            }
          />

          {/* Team Route - Navbar + TeamGrid + Footer */}
          <Route
            path="/team"
            element={
              <>
                <Navbar />
                <TeamGrid />
                <Footer />
              </>
            }
          />

          {/* My Component Route */}
          <Route
            path="/my-component"
            element={
              <>
                <Navbar />
                <MyComponent />
                <Footer />
              </>
            }
          />

          {/* Admin Panel Route */}
          <Route
            path="/admin"
            element={
              <>
                <Navbar />
                <AdminPanel />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
