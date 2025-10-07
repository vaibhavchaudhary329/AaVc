import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser, getUserDetails } from '../api/api';

function OauthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // const [errorMsg, setErrorMsg] = useState('');
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    localStorage.setItem("token", token);
    const email = params.get("email");
    const identifier = params.get("email");
    const password = '0';
    const fullName = params.get("fullname");;
    const mobile = '0';
    const username = email.split('@')[0];
    const confirmPassword = '0';


    // const loginGoogleProfile = async () => {
    //   console.log("From OauthRedirect Signin Success before try: ",email, password, identifier);
    //   try {
    //     const response = await signinUser({ identifier, password });
    //     console.log("From OauthRedirect Signin Success: ", response);
    //     localStorage.setItem("token", response.data.token);
    //     localStorage.setItem("googleuserid", identifier);
    //     navigate('/home');
    //   } catch (error) {
    //     console.log("Error from OauthRedirect", error.response.data);
    //     alert("ERROR from Outh");
    //     createGoogleProfile();
    //   }
    // };

    const createGoogleProfile = async () => {
      try {
        alert("from success Oauth redirect createGoogleProfile");
        const response = await signupUser({ fullName, mobile, username, email, password, confirmPassword });
        setTimeout(() => navigate('/home'), 300);

      } catch (error) {
        alert("from error Oauth redirect createGoogleProfile");
        console.log("From OauthRedirect Error: ", error.response.data);
        // setErrorMsg("Signin failed", error.response.data);

      }
    };

    const fetchUserData = async () => {
      try {
        const response = await getUserDetails({ identifier: identifier });
        console.log("RES: ", response);
        localStorage.setItem("googleuserid", email);
        navigate('/home');

      } catch (error) {
        console.error("Error is", error);
        localStorage.setItem("googleuserid", email);
        createGoogleProfile();
      }

    };

    console.log("This is from OauthRedirect.js  token email from URL:", token, email);
    //navigate('/home')
    fetchUserData();
    //createGoogleProfile();
    //loginGoogleProfile();
    // if (token == null) {
    //   localStorage.setItem("token", token);
    //   if (localStorage.getItem('googleuserid') == null) {
    //      console.log("This is from OauthRedirect.js ");
    //     loginGoogleProfile();
    //     localStorage.setItem("googleuserid", email);
    //     createGoogleProfile();
    //   }
    //  navigate("/home");
    // } else {
    //   console.log("This is from OauthRedirect.js  No token found. Going back to /signin...");
    //   navigate("/signin");
    // }
  },);

  return
  // {errorMsg && (<p style={{ color: 'red' }}>{errorMsg}</p>)}
  <div>
    Logging you in with Google...
  </div>;
}

export default OauthRedirect;
