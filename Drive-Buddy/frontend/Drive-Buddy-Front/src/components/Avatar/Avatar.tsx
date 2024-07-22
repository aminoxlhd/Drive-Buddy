import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Avatar.scss';
import defaultAvatar from '../../assets/defaultAvatar.jpg';

interface AvatarProps {
    user: {
        avatarUrl?: string;
    };
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
    const navigate = useNavigate();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="avatar-container">
            <div className="avatar" onClick={toggleDropdown}>
                <img src={user.avatarUrl || defaultAvatar} alt="Avatar" />
            </div>
            {isDropdownVisible && (
                <div className="dropdown-menu">
                    <Link to="/settings">Settings</Link>
                    <Link to="/profile">Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default Avatar;