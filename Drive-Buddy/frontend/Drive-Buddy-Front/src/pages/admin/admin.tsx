import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth/auth";




export const AdminLoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState({
        isLoggedIn: true,
        type: 'admin',
    });

    const handleLogin = async () => {
        console.log('Login button clicked'); 
        try {
            const data = { email, password, type: 'admin' };
            const response = await loginUser(data); 
            localStorage.setItem('token', response.access_token);
            localStorage.setItem('admin', 'true')
            let avatar = ''

            setUser({
                isLoggedIn: true,
                type: 'admin',
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
                <h2>Admin Login</h2>
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
                
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}


