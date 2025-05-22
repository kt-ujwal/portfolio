import React from 'react';
import { FaLinkedin, FaGithub, FaYoutube, FaEnvelope } from 'react-icons/fa';
import '../stylesheets/header-footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      
      

     
      <div className="social-links">
        <a href="https://www.linkedin.com/in/ujwal-kt"
           target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>

        <a href="mailto:ujwal.kct@gmail.com"
           target="_blank" rel="noopener noreferrer"><FaEnvelope /></a>

        <a href="https://github.com/kt-ujwal"
           target="_blank" rel="noopener noreferrer"><FaGithub /></a>

        <a href="https://youtube.com/@ujwalkt3024"
           target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
      </div>

      <p className="credits vt323-regular">
        Made&nbsp;with&nbsp;<span className="heart">❤</span>&nbsp;by&nbsp;Ujwal&nbsp;KT
      </p>
    </footer>
  );
}

export default Footer;
