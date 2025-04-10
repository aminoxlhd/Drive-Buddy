import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { getCurrentStudent, getCurrentTeacher, loginUser } from '../../services/auth/auth'; // Import loginUser function
import girlly from '../../assets/girlly.jpg';



const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState<'student' | 'teacher'>('student'); // Default to 'student'
    const [error, setError] = useState('');
    const [user, setUser] = useState({
        isLoggedIn: true,
        type: 'student', // 'student' or 'teacher'
        avatarUrl: 'path/to/avatar.jpg',
    });

    const handleLogin = async () => {
        console.log('Login button clicked'); 
        try {
            const data = { email, password, type: userType };
            const response = await loginUser(data); 
            localStorage.setItem('token', response.access_token);
            localStorage.setItem('type', userType)
            let avatar = ''
            if(userType == 'student'){
                let student = await getCurrentStudent()
                localStorage.setItem('avatar', student.media)
                avatar = student.media
            }else{
                let teacher = await getCurrentTeacher()
                localStorage.setItem('avatar', teacher.media)
                avatar = teacher.media
            }

            setUser({
                isLoggedIn: true,
                type: userType,
                avatarUrl: avatar || 'assets/default-avatar.jpg',
            });
            window.location.href = "/"

        } catch (err) {
            console.error('Login error:', err);
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
                <img src={girlly} alt="Login" />
            </div>
        </div>
    );
};

export default Login;
