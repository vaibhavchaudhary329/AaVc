import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import signupUser from '../api/api.js'

function EditUser() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const handleEditUser = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    else if (password == confirmPassword) {
      // try {
      //   const response = await axios.post(`${constants.API_URL}/user/register`, {
      //     username, email, password, confirmPassword
      //   });
      //   alert(response.data);
      //   navigate('/signin');
      // } catch (error) {
      //   console.error("Error is", error);
      //   setError(error.response?.data || "Signup failed");
      // }
    };
  }
  return (
    <div className="container">
      <h2 >Edit User</h2>
      <form onSubmit={handleEditUser}>
        {/* Name */}
        <div style={{ marginBottom: '15px' }}>
          <input type="text" placeholder="Name" value={name}
            onChange={(e) => setName(e.target.value)} required />
        </div>

        {/* Username */}
        <div style={{ marginBottom: '15px' }}>
          <input type="text" placeholder="Username" value={username}
            onChange={(e) => setUsername(e.target.value)} required />
        </div>

        {/* Email */}
        <div style={{ marginBottom: '15px' }}>
          <input type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
        </div>

        {/* Password */}
        {/* <div style={{ marginBottom: '15px', position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <span onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div> */}

        {/* Confirm Password */}
        {/* <div style={{ marginBottom: '15px', position: 'relative' }}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div> */}
        {/* Phone */}
        <div style={{ marginBottom: '15px', position: 'relative' }}>
          <input type="text" placeholder="Phone" value={phone}
            onChange={(e) => setPhone(e.target.value)} required />
        </div>

        {error && <p style={{ color: 'red', textAlign: 'left' }}>{error}</p>}
        <button type="submit">Update</button>
        {/* <button onClick={() => navigate('/signin')} > Existing User?</button> */}
      </form>
    </div>
  );

}
export default EditUser;
