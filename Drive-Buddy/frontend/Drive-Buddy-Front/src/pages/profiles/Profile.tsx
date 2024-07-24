// components/Profile.tsx

import React, { useState, useEffect } from 'react';
import { getCurrentStudent, getCurrentTeacher, updateCurrentStudent } from '../../services/auth/auth';
import { Student, Teacher } from '../../services/auth/auth.interface';
import { uploadImage } from '../../services/cloudinary/cloudinary';

const Profile = () => {
    const [user, setUser] = useState<Student | Teacher>({
        id : '',
        first_name : '',
        last_name : '',
        email : '',
        media : ''
    });
    let userType = localStorage.getItem('type')
    const [avatar, setAvatar] = useState<String | null>(null);

    useEffect(() => {
        if(userType == "student")
            getCurrentStudent().then(res => {
                setUser(res)
                setAvatar(res.media)
            }
            ).catch((e) => console.error('Error fetching user : ' + e))
        else
            getCurrentTeacher().then(res => {
                setUser(res)
                setAvatar(res.media)
            }
            ).catch((e) => console.error('Error fetching user : ' + e))
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
      };
      

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            uploadImage(e.target.files[0]).then(res => {
                user.media = res
                updateCurrentStudent(user).then(() => {}).catch(e => {}) 
                setAvatar(res);

            })
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user) {
            try {
                updateCurrentStudent(user).then(() => {
                }).catch(e => {
                }) 
                setAvatar(user.media);
            } catch (error) {
                console.error('Error updating user data:', error);
            }
        }
    };

    if (!user) {
        return <p>Loading user profile...</p>;
    }

    

    return (
        <div className="container profile-container">
            <h1>Student Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="avatar form-groupe">
                    <img src={user.media || '/default-avatar.png'} alt="User Avatar" />
                    <br/>
                    <input type="file" name="avatarUrl" onChange={handleAvatarChange} />
                </div>
                <div className="user-details">
                    <div className="form-group">
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
                    </div>
                    <div className="form-group">
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
                    </div>
                    <div className="form-group">
                        <label>
                            Email:
                            <input type="email" name="email" value={user.email} onChange={handleChange} />
                        </label>
                    </div>
                    <button className="btn btn-primary" type="submit">Update Profile</button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
