import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { loginUser } from '../../services/auth/auth'; // Import loginUser function

interface Props {
    setUser: React.Dispatch<React.SetStateAction<{
        isLoggedIn: boolean;
        type: string;
        avatarUrl: string;
    }>>;
}

const Login: React.FC<Props> = ({ setUser }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState<'student' | 'teacher'>('student'); // Default to 'student'
    const [error, setError] = useState('');

    const handleLogin = async () => {
        console.log('Login button clicked'); // Log when button is clicked
        try {
            const data = { email, password, type: userType };
            const response = await loginUser(data); // Call loginUser function

            // Handle successful login response
            setUser({
                isLoggedIn: true,
                type: response.type, // Assuming the response contains the user type
                avatarUrl: response.avatarUrl || 'assets/default-avatar.jpg',
            });
            navigate('/'); // Navigate to home page after successful login

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
                <div>
                    <label htmlFor="userType">User Type:</label>
                    <select
                        id="userType"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value as 'student' | 'teacher')}
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
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
