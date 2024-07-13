import React, { useState } from 'react';
import './DriverSignup.scss';

const DriverSignup: React.FC = () => {
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
    driverLicense: '',
    acceptConditions: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="driver-signup-form">
      {step === 1 && (
        <form onSubmit={handleNext}>
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
            onChange={handleChange}
          />
          <label>
            <input
              type="checkbox"
              name="acceptConditions"
              checked={formData.acceptConditions}
              onChange={handleCheckboxChange}
            />
            I accept the conditions
          </label>
          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
};

export default DriverSignup;
