import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';
import defaultAvatar from '../../assets/Avatar-aissa.png';
import logo from "../../assets/logo2.png";

const Nav = () => {
    const [user, setUser] = useState({
        isLoggedIn: false,
        type: 'student', // 'student' or 'teacher'
        avatarUrl: '', // Set to empty to use default
    });

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleLogin = () => {
        setUser({
            isLoggedIn: true,
            type: 'teacher',
            avatarUrl: 'path/to/new-avatar.jpg',
        });
    };

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleLogout = () => {
        setUser({
            isLoggedIn: false,
            type: '',
            avatarUrl: '',
        });
    };


    return (
        <div className="container">
            <nav>
                <div className="nav-logo">
                    <Link to="/">  Driver<span>B.</span></Link>
                </div>
                <div className="nav-links">
                    {user.isLoggedIn ? (
                        <>
                            <Link to="/myorder">My Order</Link>
                            {user.type === 'student' && <Link to="/explore">Explore</Link>}
                            {user.type === 'teacher' && <Link to="/mycar">My Car</Link>}
                        </>
                    ) : (
                        <>
                            <Link to="/">Home</Link>
                            <Link to="/category">Category</Link>
                            <Link to="/prices">Prices</Link>
                            <Link to="/contact">Contact Us</Link>
                        </>
                    )}
                </div>
                <div className="nav-user">
                    {user.isLoggedIn ? (
                        <div className="user-info">
                            <div className="profile-avatar" onClick={toggleDropdown}>
                                <img src={user.avatarUrl || defaultAvatar} alt="Profile" />
                            </div>
                            {isDropdownVisible && (
                                <div className="dropdown-menu">
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button className="primary" onClick={handleLogin}>Login</button>
                    )}
                </div>
            </nav>
            <div className="separator"></div>
        </div>
    );
};

export default Nav;
