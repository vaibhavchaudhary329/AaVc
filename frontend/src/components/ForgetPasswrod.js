import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgetPassword } from '../api/api'

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await forgetPassword({ email });
            alert(response.data);
        } catch (error) {
            console.error("Error is", error);
            setError(error.response?.data);
        }
        // TODO: send this data to backend
        console.log('Email:', email);
    };

    return (
        <div className="container">
            <h2 style={{ color: '#1E3A8A', marginBottom: '20px' }}>Forget Password</h2>
            <form onSubmit={handleForgetPassword}>
                <div style={{ marginBottom: '15px', position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red', textAlign: 'left' }}>{error}</p>}
                <button type="submit" >Reset Password</button>
            </form>
        </div>
    );
}

export default ForgetPassword;
