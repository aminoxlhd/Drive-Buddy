// ContactUs.tsx

import React from 'react';
import './ContactUs.scss';
import adress from '../../assets/addressIcon.png';
import email from '../../assets/emailIcon.png';
import phone from '../../assets/phoneIcon.png';

const ContactUs: React.FC = () => {
    return (
        <div className="contact-us-container">
            <div className="contact-header">
                <h2>Contact Us</h2>
                <p>Get in touch with us. We're here to help!</p>
            </div>
            <div className="contact-info">
                <div className="info-item">
                    <div className="info-icon">
                        <img src={adress} alt="Address Icon" />
                    </div>
                    <div className="info-text">
                        <h3>Address</h3>
                        <p>123 Example Street, City, Country</p>
                    </div>
                </div>
                <div className="info-item">
                    <div className="info-icon">
                        <img src={phone} alt="Phone Icon" />
                    </div>
                    <div className="info-text">
                        <h3>Phone</h3>
                        <p>+1 234 567 890</p>
                    </div>
                </div>
                <div className="info-item">
                    <div className="info-icon">
                        <img src={email} alt="Email Icon" />
                    </div>
                    <div className="info-text">
                        <h3>Email</h3>
                        <p>contact@example.com</p>
                    </div>
                </div>
            </div>
            <div className="contact-form">
                <h3>Send us a message</h3>
                <form>
                    <input type="text" placeholder="Your Name" />
                    <input type="email" placeholder="Your Email" />
                    <textarea placeholder="Your Message"></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
