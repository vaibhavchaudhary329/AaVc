import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OauthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log("[OauthRedirect] token from URL:", token);

    if (token) {
      localStorage.setItem("token", token);
      console.log("[OauthRedirect] Token saved. Redirecting to /home...");
      navigate("/home");
    } else {
      console.log("[OauthRedirect] No token found. Going back to /signin...");
      navigate("/signin");
    }
  }, [navigate]);

  return <div>Logging you in with Google...</div>;
}

export default OauthRedirect;
