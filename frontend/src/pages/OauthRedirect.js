import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from '../api/api';

function OauthRedirect() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const email = params.get("email");
    const fullName = "Ayush";
    const mobile = 1231231234;
    const username = 'agrayush';
    const password = 'qwertasdfg';
    const confirmPassword = 'qwertasdfg';

    const createGoogleProfile = async () => {
      try {
        const response = await signupUser({fullName, mobile, username, email, password, confirmPassword, mobile ,email});
        console.log("From OauthRedirect Success: ", response);
        setMessage(response);
      } catch (error) {
        console.log("From OauthRedirect Error: ", error);
        setError('Error while creating gprofile ');
      }
    };

    console.log("This is from OauthRedirect.js  token params email from URL:", token, params, email);

    if (token == null) {
      localStorage.setItem("token", token);
      if (localStorage.getItem('googleuserid') == null) {
        console.log("This is from OauthRedirect.js ");
        localStorage.setItem("googleuserid", email);
        createGoogleProfile();
      } else{
       // navigate("/home");
      }
    } else {
      console.log("This is from OauthRedirect.js  No token found. Going back to /signin...");
      //navigate("/signin");
    }
  }, [navigate]);

  return <div>Logging you in with Google...</div>;
}

export default OauthRedirect;
