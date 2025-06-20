// src/pages/OauthRedirect.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OauthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/home"); // or wherever you want
    } else {
      navigate("/signin");
    }
  }, []);

  return <div>Logging you in...</div>;
}

export default OauthRedirect;
