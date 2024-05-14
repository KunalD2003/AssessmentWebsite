import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'; 
import './Footer.css';
const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-4">
            <h5>AveryBit Solutions Private Limited</h5>
            <p>36, Bicholi Hapsi Road,
            near Phoenix Hospital,
            Shukh Shanti Nagar, Indore</p>
          </div>
          <div className="col-12 col-md-4">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li>Email: hello@averybit.com</li>
              <li>Phone: +91-6263628392</li>
            </ul>
          </div>
          {/* Social Media Links */}
          <div className="col-12 col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled d-flex gap-3">
              <li><a href="https://github.com" className="text-white"><i className="bx bxl-github"></i></a></li>
              <li><a href="https://linkedin.com" className="text-white"><i className="bx bxl-linkedin-square"></i></a></li>
              <li><a href="https://facebook.com" className="text-white"><i className="bx bxl-facebook bg-color-primary"></i></a></li>
              <li><a href="https://instagram.com" className="text-white"><i className="bx bxl-instagram"></i></a></li>
              <li><a href="https://youtube.com" className="text-white"><i className="bx bxl-youtube"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;