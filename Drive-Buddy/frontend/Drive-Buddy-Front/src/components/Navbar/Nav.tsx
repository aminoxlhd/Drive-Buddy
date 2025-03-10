import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.scss';
import defaultAvatar from '../../assets/Avatar-aissa.png';

const Nav = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        isLoggedIn: localStorage.getItem('token') != null,
        type: localStorage.getItem('type'),
        avatarUrl: localStorage.getItem('avatar'),
        isAdmin : localStorage.getItem('admin') == "true"
    });

    const loginRoute = () => {
        navigate('/login');
    }

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleLogout = () => {
        setUser({
            isLoggedIn: false,
            type: null,
            avatarUrl: '',
            isAdmin : false
        });
        localStorage.clear()
        navigate('/');
    };

    const goToProfile = () => {
        navigate('/Profile');
        setIsDropdownVisible(false); // Close dropdown after navigation
    };



    

    return (
        <div className="container">
            <nav>
                <div className="nav-logo">
                    <Link to="/">Driver<span>B.</span></Link>
                </div>
                <div className="nav-links">
                    { user.isAdmin ? (
                        <div>
                             <Link to="/teachers">Teachers</Link>
                             <Link to="/students">Students</Link>
                             <Link to="/purchases">Purchases</Link>
                             <Link to="/cars">Cars</Link>
                        </div>
                    ) : (
                        <div>
                            {user.isLoggedIn ? (
                                <>
                                    {user.type === 'teacher' && <Link to="/myorder-teacher">Manage My Orders</Link>}
                                    {user.type === 'student' && <Link to="/myorder">My Orders</Link>}
                                    <Link to="/category">Category</Link>
                                    {user.type === 'teacher' && <Link to="/mycars">My Cars</Link>}
                                </>
                            ) : (
                                <>
                                    <Link to="/">Home</Link>
                                    <Link to="/category">Category</Link>
                                    <Link to="/prices">Prices</Link>
                                    <Link to="/contactus">Contact Us</Link>
                                </>
                            )}
                        </div>
                    )}

                </div>
                <div className="nav-user">
                    {user.isLoggedIn ? (
                        <div className="user-info">
                            <div className="profile-avatar" onClick={toggleDropdown}>
                                <img src={user.avatarUrl ? user.avatarUrl : defaultAvatar} alt="Profile" />
                            </div>
                            {isDropdownVisible && (
                                <div className="dropdown-menu">
                                    <button onClick={goToProfile}>Profile</button>
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button className="primary" onClick={loginRoute}>Login</button>
                    )}
                </div>
            </nav>
            <div className="separator"></div>
        </div>
    );
};

export default Nav;
