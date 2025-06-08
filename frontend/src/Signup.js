import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return; // ✅ prevent further execution
    }
    else if (password == confirmPassword) {
      try {
        const response = await axios.post('https://aavc.onrender.com/user/register', {
          username, email, password, confirmPassword
        });
        alert(response.data);
        navigate('/signin');
      } catch (error) {
        console.error("Error is", error);
        setError(error.response?.data || "Signup failed");
      }
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
        <h2 style={{ color: '#1E3A8A', marginBottom: '20px' }}>Sign Up</h2>
        <form onSubmit={handleSignup}>
          {/* Username */}
          <div style={{ marginBottom: '15px' }}>
            <input type="text" placeholder="Username" value={username}
              onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #1E3A8A', outline: 'none' }} />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '15px' }}>
            <input type="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #1E3A8A', outline: 'none' }} />
          </div>

          {/* Password */}
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
                top: '50%',
                right: '37%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                fontSize: '18px'
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #1E3A8A',
                outline: 'none',
              }}
            />
            <span onClick={() => setShowConfirmPassword((prev) => !prev)}
              style={{
                position: 'absolute',
                top: '58%',
                right: '37%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                fontSize: '18px'
              }}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {error && <p style={{ color: 'red', textAlign: 'left' }}>{error}</p>}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              margin: '10px',
              backgroundColor: '#1E3A8A',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Sign Up
          </button>
          <button onClick={() => navigate('/signin')} style={{
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
            Existing User?
          </button>
        </form>
      </div>
    );
  }
}
export default Signup;
