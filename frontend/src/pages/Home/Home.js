// src/pages/Home/Home.js (or wherever your Home.js is located)
import React, { useEffect, useState, useRef } from 'react';
// Remove 'import axios from 'axios';' as you are now using the configured 'api'
import { FaCircle } from 'react-icons/fa'; // User avatar icon
import './Home.css'; // Import your custom CSS
import { useNavigate } from 'react-router-dom';
import { getHome, getUserDetails } from '../../api/api'; // Ensure this path is correct for your updated api.js

function Home() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const [initials, setInitials] = useState('');
    const [userData, setUserData] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    let identifier = localStorage.getItem("userinfo");
    if (!identifier) {
        identifier = localStorage.getItem("googleuserid");
    }
    const toggleDropdown = () => setShowDropdown(prev => !prev);
    const handleEdit = () => {
        setShowDropdown(false);
        navigate('/edituser', { state: { editType: 'profile', fullName: userData.fullName, email: userData.email, mobile: userData.mobile } });
    };
    const handleLogout = () => {
        // Clear token from localStorage on logout
        localStorage.removeItem('token');
        localStorage.removeItem('userinfo');
        localStorage.removeItem('googleuserid');
        navigate('/signin');
        setShowDropdown(false);
    };

    const handlePasswordChange = () => {
        setShowDropdown(false);
        navigate('/edituser', { state: { editType: 'password' } });
    }

    console.log("[Home] Component rendered."); // Debugging log

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
      }
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getHome();
                setMessage(response);
                navigate("/home");
            } catch (error) {
                console.error("Error is", error);
                setError('Error in User Home API');
            }
        };

        const fetchUserData = async () => {
            try {
                const response = await getUserDetails({ identifier: identifier });
                const fullName = response.fullName;
                const generateInitials = fullName.split(" ").map(name => name[0]).join("").toUpperCase();
                setInitials(generateInitials);
                setUserData({ fullName: response.fullName, email: response.email, mobile: response.mobile });
                console.log("RES: ", response);

            } catch (error) {
                console.error("Error is", error.response.data.message);
                setError('Error in fetching user data');
                // alert("Error from home fetchuserdata ");
                navigate('/home')
            }
        };

        if (identifier) {
            fetchUserData();
            fetchData();
        }
        else {
            setError("Identider is null");
        }
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false); // Assuming setIsMenuOpen is related to a different menu
                setShowDropdown(false); // Close the dropdown too
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="home-container">
            <div className="avatar-wrapper" onClick={toggleDropdown}>
                <FaCircle className="avatar-circle" />
                <span className="avatar-initials">{initials}</span>
            </div>

            {showDropdown && (
                <div className="dropdown">
                    <div onClick={handleEdit}>Profile</div>
                    <div onClick={handlePasswordChange}>Change Password</div>
                    <div onClick={handleLogout}>Logout</div>
                </div>
            )}
            <h2>{message} to AAVC HOME PAGE!!</h2>
            {error && <p style={{ color: 'red', textAlign: 'left' }}>{error}</p>}
        </div>
    );
}

export default Home;