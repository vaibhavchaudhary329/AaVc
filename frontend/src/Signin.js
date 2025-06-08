import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

function Signin() {
    const [identifier, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://aavc.onrender.com/auth/login', { identifier, password });
            alert(response.data);
            navigate('/home');
        } catch (error) {
            console.error("Error is", error);
            setError(error.response.data);
        }
        // TODO: send this data to backend
        console.log('Email:', identifier);
        console.log('Password:', password);
    };

    return (
        <div style={{
            maxWidth: '350px',
            margin: '100px auto',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f0f8ff',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 255, 0.1)'
        }}>
            <h2 style={{ color: '#1E3A8A', marginBottom: '20px' }}>Sign In</h2>
            <form onSubmit={handleSignin}>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        placeholder="Email"
                        value={identifier}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #1E3A8A',
                            outline: 'none',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #1E3A8A',
                            outline: 'none',
                        }}
                    />
                    <span onClick={() => setShowPassword((prev) => !prev)}
                        style={{
                            position: 'absolute',
                            top: '42%',
                            right: '37%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            fontSize: '18px'
                        }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                {error && <p style={{ color: 'red', textAlign: 'left' }}>{error}</p>}
                <button type="submit" style={{
                    width: '100%',
                    padding: '10px',
                    margin: '10px',
                    backgroundColor: '#1E3A8A',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                }}>Sign In</button>
                <button onClick={() => navigate('/signup')} style={{
                    width: '100%',
                    padding: '10px',
                    margin: '10px',
                    backgroundColor: '#1E3A8A',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                }}>
                    New User?
                </button>
                <button onClick={() => navigate('/forgetpassword')} style={{
                    width: '100%',
                    padding: '10px',
                    margin: '10px',
                    backgroundColor: '#1E3A8A',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                }}>
                    Forget Password
                </button>
            </form>
        </div>
    );
}

export default Signin;
