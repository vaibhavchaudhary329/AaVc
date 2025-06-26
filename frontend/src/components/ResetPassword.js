import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { resetPassword } from '../api/api'

function ResetPassword() {

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log("Token:", token);
  //const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
    }
    else if (newPassword === confirmPassword) {
      try {
        const response = await resetPassword({ token, newPassword, confirmPassword });
        alert(response.data);
        navigate('/signin');
      } catch (error) {
        console.error("Error is", error);
        setError(error.response?.data);
      }
      console.log("Data", token, newPassword, confirmPassword);
    }
  };

  return (
    <div className="container" >
      <h2 >Reset Password</h2>
      <form onSubmit={handleSubmit}>

        {/* 
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
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
        </div> */}

        <div style={{ marginBottom: '15px', position: 'relative' }}>
          <input
            type={showNewPassword ? 'text' : 'password'}
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
          />
          <span onClick={() => setShowNewPassword((prev) => !prev)}>
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div style={{ marginBottom: '15px', position: 'relative' }}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
          />
          <span onClick={() => setShowConfirmPassword((prev) => !prev)} >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {error && <p style={{ color: 'red', textAlign: 'left' }}>{error}</p>}

        <button type="submit"> Submit </button>
      </form>
    </div>
  );

}

export default ResetPassword;
