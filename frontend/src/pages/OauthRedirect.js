import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserEmail } from '../api/api';

function OauthRedirect() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const email = params.get("email");
    localStorage.setItem("userinfo", email);
    const fetchUserEmail = async () => {
      try {
        const response = await getUserEmail();
        console.log("From OauthRedirect Success: ", response);
        setMessage(response);
      } catch (error) {
        console.log("From OauthRedirect Error: ", error);
        setError('Error fetching home data OR');
      }
    };

    console.log("[OauthRedirect] token from URL:", token, params, email);

    if (token) {
      localStorage.setItem("token", token);
      console.log("[OauthRedirect] Token saved. Redirecting to /home...");
      fetchUserEmail();
      navigate("/home");
    } else {
      console.log("[OauthRedirect] No token found. Going back to /signin...");
      navigate("/signin");
    }
  }, [navigate]);

  return <div>Logging you in with Google...</div>;
}

export default OauthRedirect;
