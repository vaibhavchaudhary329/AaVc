import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleForgetPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/auth/forgot-password', { email });
            alert(response.data);
        } catch (error) {
            console.error("Error is", error);
            setError('Error');
        }
        // TODO: send this data to backend
        console.log('Email:', email);
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
            <h2 style={{ color: '#1E3A8A', marginBottom: '20px' }}>Forget Password</h2>
            <form onSubmit={handleForgetPassword}>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
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
                }}>Reset Password</button>
            </form>
        </div>
    );
}

export default ForgetPassword;
