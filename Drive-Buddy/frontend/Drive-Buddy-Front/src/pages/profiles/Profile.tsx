// components/Profile.tsx

import React, { useState, useEffect } from 'react';
import { getCurrentStudent, updateCurrentStudent } from '../../services/auth/auth';
import { updateUserInfo } from '../../services/updateUserInfo/updateUserInfo';
import { User, UpdateUserData } from '../../services/updateUserInfo/updateUserInfo.interface';
import { Student } from '../../services/auth/auth.interface';

const Profile = () => {
    const [user, setUser] = useState<Student>({
        id : '',
        first_name : '',
        last_name : '',
        email : ''
    });

    const [avatar, setAvatar] = useState<File | null>(null);

    useEffect(() => {
        getCurrentStudent().then(res => setUser(res)).catch((e) => console.error('Error fetching user : ' + e))
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
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
                updateCurrentStudent(user).then(() => {
                    // TODO show message succes
                }).catch(e => {
                    // TODO show error message
                }) 
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
            <h1>Student Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="avatar">
                    <img src={user.avatarUrl || '/default-avatar.png'} alt="User Avatar" />
                    <input type="file" name="avatarUrl" onChange={handleAvatarChange} />
                </div>
                <div className="user-details">
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={user.first_name}
                            onChange={handleChange}
                            disabled
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={user.last_name}
                            onChange={handleChange} 
                            disabled
                        />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={user.email} onChange={handleChange} />
                    </label>
                    <button type="submit">Update Profile</button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
