import { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { signinUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';

function Signin() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSignin = async (e) => {
        e.preventDefault();

        try {
            const response = await signinUser({ identifier, password });
            alert(response.data);
            navigate('/home');
        } catch (error) {
            console.error("Error is", error);
            setError(error.response?.data || "Signin failed");
        }
        // TODO: send this data to backend
        console.log('Email:', identifier);
        console.log('Password:', password);
    };

    return (
        <div className="container">
            <h2>Sign In</h2>
            <form onSubmit={handleSignin}>
                <div style={{ marginBottom: '15px', position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Email/UserName/Phone"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginBottom: '30px', position: 'relative' }}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                    />
                    <span onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                {error && <p style={{ color: 'red', textAlign: 'left' }}>{error}</p>}
                <button type="submit">Sign In</button>
                <button onClick={() => navigate('/signup')} >
                    New User?
                </button>
                <button onClick={() => navigate('/forgetpassword')} >
                    Forget Password
                </button>
            </form>
        </div>
    );
}

export default Signin;
