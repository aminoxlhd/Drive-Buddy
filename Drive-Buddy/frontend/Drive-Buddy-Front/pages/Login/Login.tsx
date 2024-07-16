import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.scss';

const Login = ({ setUser }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        console.log('Login button clicked'); // Log when button is clicked
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
            console.log('API Response:', response); // Log the API response

            if (response.status === 200) {
                setUser({
                    isLoggedIn: true,
                    type: response.data.type, // Assuming the response contains the user type
                    avatarUrl: response.data.avatarUrl || 'path/to/default-avatar.jpg',
                });
                navigate('/');
            } else {
                setError('Login failed. Please check your credentials and try again.');
            }
        } catch (err) {
            console.error('Login error:', err); // Log any errors
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Welcome back <span role="img" aria-label="wave">👋</span></h2>
                {error && <p className="error-message">{error}</p>}
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                <div className="remember-me">
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe">Remember me</label>
                </div>
                <button onClick={handleLogin}>Login</button>
            </div>
            <div className="login-image">
                <img src="/assets/girlly.jpg" alt="Login" />
            </div>
        </div>
    );
};

export default Login;
