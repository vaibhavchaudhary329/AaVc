import { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { signinUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const response = await signinUser({ identifier, password });
      const token = response.token || response.data?.token;

      if (token) {
        localStorage.setItem('token', token);
        navigate('/home');
      } else {
        setError('Token not received');
      }
    } catch (error) {
      console.error("Error is", error);
      setError(error.response?.data || "Signin failed");
    }
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
          />
          <span onClick={() => setShowPassword((prev) => !prev)} style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '8px' }}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Sign In</button>

        <button type="button" onClick={() => navigate('/signup')}>
          New User?
        </button>

        <button type="button" onClick={() => navigate('/forgetpassword')}>
          Forget Password
        </button>

        <button
          type="button"
          onClick={() => {
            window.location.assign("http://localhost:8080/oauth2/authorization/google");
          }}
          style={{
            marginTop: '20px',
            backgroundColor: '#4285F4',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Login with Google
        </button>
      </form>
    </div>
  );
}

export default Signin;
