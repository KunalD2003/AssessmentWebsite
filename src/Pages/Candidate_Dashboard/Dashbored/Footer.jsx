import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';
const Footer = () => {
  return (
    <footer className="container d-flex footer">
      {/* Company Information */}
      <div className="col">
        <a href="https://www.companywebsite.com">CompanyName</a>
      </div>

      {/* Contact Information */}
      <div className="col">
        <p>Phone: +1-123-456-7890</p>
        <p>Email: contact@companyemail.com</p>
      </div>

      {/* Social Media Links */}
      <div className="col">
        <p>Connect with us:</p>
        <a href="https://www.youtube.com/company" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        <a href="https://www.facebook.com/company" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://www.instagram.com/company" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
