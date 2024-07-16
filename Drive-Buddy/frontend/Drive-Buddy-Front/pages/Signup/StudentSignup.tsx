import React, { useState } from 'react';
import './StudentSignup.scss';
import studentImage from '../../assets/mentor.jpg';
import { createStudent, StudentFormData } from '../../services/students/students';

const StudentSignup: React.FC = () => {
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: '',
    password: ''
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      const response = await createStudent({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });

      console.log('Student signed up successfully:', response);

      // Redirect to profile setup page or handle accordingly
      // history.push(`/profile/setup/${response.id}`);

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="student-signup-container">
      <div className="left-content">
        <div className="signup-form">
          <h2>Student Sign Up</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            <div className="name-container">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
      <div className="right-content" style={{ backgroundImage: `url(${studentImage})` }} />
    </div>
  );
};

export default StudentSignup;