import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { signupUser } from '../../api/api'

function Signup() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
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
      return;
    }
    else if (password === confirmPassword) {
      try {
        const response = await signupUser({ mobile, fullName, username, email, password, confirmPassword });
        alert(response.data);
        navigate('/signin');
      } catch (error) {
        console.error("Error is", error);
        setError(error.response?.data || "Signup failed");
      }
    };
  }
  return (
    <div className="container">
      <h2 >Sign Up</h2>
      <form onSubmit={handleSignup}>
        {/* Name */}
        <div style={{ marginBottom: '15px' }}>
          <input type="text" placeholder="Full Name" value={fullName}
            onChange={(e) => setFullName(e.target.value)} required />
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
        <div style={{ marginBottom: '15px', position: 'relative' }}>
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

        {/* Confirm Password */}
        <div style={{ marginBottom: '15px', position: 'relative' }}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
          />
          <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {/* Phone */}
        <div style={{ marginBottom: '15px', position: 'relative' }}>
          <input type="tel" placeholder="Phone" value={mobile}
            onChange={(e) => setMobile(e.target.value)} required pattern="[0-9]{10}" maxLength={10}
          />
        </div>

        {error && <p style={{ color: 'red', textAlign: 'left' }}>{error}</p>}
        <button type="submit">Sign Up </button>
        <button onClick={() => navigate('/signin')} > Existing User?</button>
      </form>
    </div>
  );

}
export default Signup;
