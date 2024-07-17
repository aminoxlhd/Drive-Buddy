// components/Profile.tsx

import React, { useState, useEffect } from 'react';
import { loginUser } from '../../services/auth/auth';
import { updateUserInfo } from '../../services/updateUserInfo/updateUserInfo';
import { User, UpdateUserData } from '../../services/updateUserInfo/updateUserInfo.interface';

const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [updatedData, setUpdatedData] = useState<UpdateUserData>({});
    const [avatar, setAvatar] = useState<File | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const loginData = { email: 'john.doe@example.com', password: 'password' }; // Example login data
                const userData = await loginUser(loginData);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedData({
            ...updatedData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAvatar(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user) {
            try {
                const updatedUser = await updateUserInfo(user.id, { ...updatedData, avatarUrl: avatar });
                setUser(updatedUser);
                setUpdatedData({});
                setAvatar(null);
            } catch (error) {
                console.error('Error updating user data:', error);
            }
        }
    };

    if (!user) {
        return <p>Loading user profile...</p>;
    }

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="avatar">
                    <img src={user.avatarUrl || '/default-avatar.png'} alt="User Avatar" />
                    <input type="file" name="avatarUrl" onChange={handleAvatarChange} />
                </div>
                <div className="user-details">
                    <label>
                        First Name:
                        <input type="text" name="firstName" value={updatedData.firstName || user.firstName} onChange={handleChange} />
                    </label>
                    <label>
                        Last Name:
                        <input type="text" name="lastName" value={updatedData.lastName || user.lastName} onChange={handleChange} />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={updatedData.email || user.email} onChange={handleChange} />
                    </label>
                    <button type="submit">Update Profile</button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
