import React, { useState } from 'react';
import './Settings.scss';
import { updateUserInfo } from '../../services/updateUserInfo/updateUserInfo';

const Settings: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
    password: '',
    profilePicture: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      setUserInfo({ ...userInfo, profilePicture: files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', userInfo.email);
      formData.append('name', userInfo.name);
      formData.append('password', userInfo.password);
      if (userInfo.profilePicture) {
        formData.append('profilePicture', userInfo.profilePicture);
      }

      await updateUserInfo(formData);
      alert('Settings updated successfully');
    } catch (error) {
      alert('Failed to update settings');
    }
  };

  return (
    <div className="settings">
      <h2>Account Settings</h2>
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userInfo.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;
