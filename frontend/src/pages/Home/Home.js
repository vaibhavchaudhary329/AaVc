// src/pages/Home/Home.js (or wherever your Home.js is located)
import React, { useEffect, useState, useRef } from 'react';
// Remove 'import axios from 'axios';' as you are now using the configured 'api'
import { FaCircle } from 'react-icons/fa'; // User avatar icon
import './Home.css'; // Import your custom CSS
import { useNavigate } from 'react-router-dom';
import { getHome } from '../../api/api'; // Ensure this path is correct for your updated api.js

function Home() {
    const [message, setMessage] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Make sure these states are used if needed
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // Replace with dynamic name from auth/user or state if available
    const fullName = "abc asd"; 
    const initials = fullName
        .split(" ")
        .map(name => name[0])
        .join("")
        .toUpperCase();

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown(prev => !prev);
    const handleEdit = () => {
        setShowDropdown(false);
        navigate('/edituser');
    };
    const handleLogout = () => {
        // Clear token from localStorage on logout
        localStorage.removeItem('token');
        navigate('/signin');
        setShowDropdown(false);
    };

    console.log("[Home] Component rendered."); // Debugging log

    useEffect(() => {
        console.log("[Home] useEffect for getHome() triggered."); // Debugging log
        getHome()
            .then(response => {
                // Your backend's /user/home returns a String directly, not a JSON object,
                // so the response itself is the string.
                console.log("[Home] getHome() success. Response:", response); // Debugging log
                setMessage(response); // Set message directly from the response
            })
            .catch(error => {
                console.error("[Home] Error in getHome():", error); // Use console.error for errors
                setMessage('Error in GET');
                // The API interceptor will handle 401 redirects, but this catch block
                // will still show other errors (e.g., network, 404, 500).
            });

        // Cleanup function for useEffect (if any listeners are added here)
        return () => {
            console.log("[Home] getHome useEffect cleanup.");
        };
    }, []); // Empty dependency array ensures this runs once on mount

    // useEffect for handling click outside dropdown (from your original code)
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
                    <div onClick={handleEdit}>Edit</div>
                    <div onClick={handleLogout}>Logout</div>
                </div>
            )}
            <h2>{message} to AAVC HOME PAGE!!</h2>
        </div>
    );
}

export default Home;