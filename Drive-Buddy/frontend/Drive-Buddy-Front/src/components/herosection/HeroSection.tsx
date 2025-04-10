import React from 'react';
import { Link } from 'react-router-dom';
import carImage from '../../assets/carImage.png';
import './HeroSection.scss';

const HeroSection: React.FC = () => (
    <div className="hero">
        <h1 className="hero-title">Get Your Driver, Anytime, Anywhere</h1>
        <p className="hero-subtitle">
            Effortless Driver Booking: Connect with trusted, experienced drivers (5+ years) and get 24/7 support,
            money-back guarantee, all with just a few clicks. Skip the stress, book with us today!
        </p>
        <div className="button-container">
            <Link to="StudentSignup" className="button primary">Start you'r adventure</Link>
            <Link to="/become-a-teacher" className="text-link">Become a Driver Buddy</Link>
        </div>
        <div className="car-image">
            <div className='background-car'></div>
            <img src={carImage} alt="Car Image" />
        </div>
    </div>
);

export default HeroSection;
