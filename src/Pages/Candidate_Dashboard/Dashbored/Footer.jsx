import React from 'react';
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer'>
            <div className='address'>
                <h3>AveryBit Solutions Pvt. Ltd.</h3>
                <p>36, Bicholi Hapsi Road, near Phoenix Hospital, Shukh Shanti Nagar, Indore</p>
            </div>
            <div className='contact'>
                <h3>Contact</h3>
                <p>Email: hello@averybit.com</p>
                <p>Phone: +91-6263628392</p>
            </div>
            <div className='socials'>
                <h3>Follow Us</h3>
                <div className='social-icons'>
                    <a href=""><i className="bx bxl-github"></i></a>
                    <a href=""><i className="bx bxl-linkedin-square"></i></a>
                    <a href=""><i className="bx bxl-facebook bg-color-primary"></i></a>
                    <a href=""><i className="bx bxl-instagram"></i></a>
                    <a href=""><i className="bx bxl-youtube"></i></a>
                </div>
            </div>
        </div>
  );
};
export default Footer;