import React from 'react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa'; // Import icons
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Our Project</h1>

      <div className="about-grid">
        <div className="about-card">
          <h2 className="card-title">Our Mission</h2>
          <p className="card-content">
            We aim to revolutionize the way people interact with financial services by providing a seamless, 
            user-friendly platform that makes financial management accessible to everyone.
          </p>
        </div>

        <div className="about-card">
          <h2 className="card-title">What We Do</h2>
          <p className="card-content">
            Our platform offers comprehensive financial services including account management, 
            transaction tracking, and personalized financial insights to help users make informed decisions.
          </p>
        </div>

        <div className="about-card">
          <h2 className="card-title">Our Vision</h2>
          <p className="card-content">
            To become the leading financial service platform, setting new standards in user experience 
            and financial management solutions.
          </p>
        </div>
      </div>

      <div className="team-section">
        <h2 className="team-title">Our Team</h2>
        <div className="team-grid">
          <div className="team-card">
            <h3>Subhash Vadaparthi</h3>
            <p>Project Lead</p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/vadaparthisubhash/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={20} /> 
              </a>
              <a href="https://www.instagram.com/subhash.vadaparthi__/" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={20} /> 
              </a>
            </div>
          </div>
          <div className="team-card">
            <h3>Praneeth T</h3>
            <p>Frontend Developer</p>
          </div>
          <div className="team-card">
            <h3>Subhash Vadaparthi</h3>
            <p>Backend Developer</p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/vadaparthisubhash/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={20} /> 
              </a>
              <a href="https://www.instagram.com/subhash.vadaparthi__/" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
          <div className="team-card">
            <h3>Lohith Varma</h3>
            <p>UI/UX Designer</p>
          </div>
        </div>
      </div>
    </div> 
  );
};

export default About;
