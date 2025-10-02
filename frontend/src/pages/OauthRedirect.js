import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser, signinUser } from '../api/api';

function OauthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const email = params.get("email");
    const identifier = params.get("email");
    const password = '12345678';
    const fullName = params.get("fullname");;
    const mobile = '0';
    const username = email.split('@')[0];
    const confirmPassword = '12345678';


    const loginGoogleProfile = async () => {
      console.log("From OauthRedirect Signin Success before try: ",email, password, identifier);
      try {
        const response = await signinUser({ identifier, password });
        console.log("From OauthRedirect Signin Success: ", response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("googleuserid", identifier);
        navigate('/home');
      } catch (error) {
        console.log("Error from OauthRedirect", error.response.data);
        alert("ERROR from Outh");
        createGoogleProfile();
      }
    };

    const createGoogleProfile = async () => {
      try {
        const response = await signupUser({ fullName, mobile, username, email, password, confirmPassword });
        console.log("From OauthRedirect Success: ", response);
        alert("S");
      } catch (error) {
        console.log("From OauthRedirect Error: ", error.response.data);
        loginGoogleProfile();
      }
    };

    console.log("This is from OauthRedirect.js  token params email from URL:", token, email);
    //createGoogleProfile();
    loginGoogleProfile();
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

  return <div>Logging you in with Google...</div>;
}

export default OauthRedirect;
