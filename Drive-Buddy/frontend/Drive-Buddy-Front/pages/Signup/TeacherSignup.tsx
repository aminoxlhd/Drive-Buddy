// src/pages/TeacherSignup.tsx
import React, { useState } from 'react';
import './TeacherSignup.scss';
import teacherImage from '../../assets/teacherbuddy.jpg'; // Update the image path if needed
import { useNavigate } from 'react-router-dom';

const TeacherSignup: React.FC = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        phoneNumber: '',
        vehicleModelYear: '',
        vehicleCategory: '',
        vehicleType: '',
        driverLicense: null as File | null,
        acceptConditions: false,
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            setFormData({ ...formData, driverLicense: files[0] });
        }
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(step + 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                data.append(key, (formData as any)[key]);
            });

            const response = await fetch('http://localhost:5000/teacher', { // Update endpoint to /teacher
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                // Handle successful signup (e.g., show success message, redirect, etc.)
                console.log('Signup successful!');
                navigate('/teacherprofile'); // Redirect to teacher profile page
            } else {
                // Handle errors (e.g., show error message)
                console.error('Signup failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className="teacher-signup-container">
            <div className="left-content">
                <div className="signup-form">
                    {step === 1 && (
                        <form onSubmit={handleNext}>
                            <div className="name-container">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <input
                                type="date"
                                name="dateOfBirth"
                                placeholder="Date of Birth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                            />
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                            <button type="submit">Next</button>
                        </form>
                    )}
                    {step === 2 && (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="vehicleModelYear"
                                placeholder="Vehicle Model Year"
                                value={formData.vehicleModelYear}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="vehicleCategory"
                                placeholder="Vehicle Category"
                                value={formData.vehicleCategory}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="vehicleType"
                                placeholder="Vehicle Type"
                                value={formData.vehicleType}
                                onChange={handleChange}
                            />
                            <input
                                type="file"
                                name="driverLicense"
                                placeholder="Upload Driver License"
                                onChange={handleFileChange}
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    name="acceptConditions"
                                    checked={formData.acceptConditions}
                                    onChange={handleChange}
                                />
                                I accept the conditions
                            </label>
                            <button type="submit">Sign Up</button>
                        </form>
                    )}
                </div>
            </div>
            <div className="right-content" style={{ backgroundImage: `url(${teacherImage})` }}>
                {/* Optional: Add overlay or other elements as needed */}
            </div>
        </div>
    );
};

export default TeacherSignup;
