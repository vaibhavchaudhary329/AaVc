import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/auth/login', { username, password });
            alert(response.data);
            navigate('/home');
        } catch (error) {
            console.error("Error is", error);
        }
        // TODO: send this data to backend
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div style={{ maxWidth: '300px', margin: '100px auto', textAlign: 'center' }}>
            <h2>Sign In</h2>
            <form onSubmit={handleSignin}>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '8px' }}>Sign In</button>
            </form>
        </div>
    );
}

export default Signin;
