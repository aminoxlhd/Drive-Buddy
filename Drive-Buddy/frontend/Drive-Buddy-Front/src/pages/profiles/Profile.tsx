// components/Profile.tsx

import React, { useState, useEffect } from 'react';
import { getCurrentStudent, getCurrentTeacher, updateCurrentStudent, updateCurrentTeacher } from '../../services/auth/auth';
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
                if(userType == 'student')
                    updateCurrentStudent(user).then(() => {}).catch(e => {}) 
                else
                    updateCurrentTeacher(user).then(() => {}).catch(e => {})
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
    <div className="settings">
    <h2>Profile</h2>
    <form className="settings-form" onSubmit={handleSubmit}>
    <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
        type="email"
        id="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        />
    </div>
    <div className="form-group">
        <label htmlFor="name">First Name:</label>
        <input
        type="text"
        id="name"
        name="name"
        value={user.first_name}
        onChange={handleChange}
        disabled
        />
    </div>
    <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
        type="text"
        id="lastName"
        name="lastName"
        value={user.last_name}
        onChange={handleChange}
        disabled
        />
    </div>
    <div className="form-group">
        <label htmlFor="profilePicture">Profile Picture:</label>
        <input
        type="file"
        id="profilePicture"
        name="profilePicture"
        onChange={handleAvatarChange}
        />
    </div>
    <button type="submit" className="save-button">Save Changes</button>
    </form>
    </div>


    );
};

export default Profile;
