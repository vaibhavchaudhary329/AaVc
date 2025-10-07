import { useState, useEffect, useRef } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { signinUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const userInfo = localStorage.getItem("userinfo") || localStorage.getItem("googleuserid") ;
    if (userInfo && token ) {
      console.log("already logged in",userInfo);
      navigate("/home");
    }
  }, []);

  const handleSignin = async (e) => {
    console.log("After succful signin ", identifier, password);
    e.preventDefault();
    try {
      const response = await signinUser({ identifier, password });
      console.log("After succful signin ", response.data.token);
      alert("User Successfully signin");
      localStorage.setItem("userinfo", identifier);
      localStorage.setItem("token", response.data.token);
      navigate('/home');
    } catch (error) {
      console.log("Error is", error.response.data);
      setErrorMsg("Signin failed", error.response.data);
      alert("ERROR", errorMsg);
      navigate('/signin');
    }
    // TODO: send this data to backend
    console.log('Identifier:', identifier);
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
          //minLength={8}
          />
          <span onClick={() => setShowPassword((prev) => !prev)} >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

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

        {errorMsg && (<p style={{ color: 'red' }}>{errorMsg}</p>)}
      </form>
    </div>
  );
}

export default Signin;
