import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FaCircle } from 'react-icons/fa'; // User avatar icon
import './Home.css'; // Import your custom CSS
import { useNavigate } from 'react-router-dom';
import { getHome } from '../../api/api'


function Home() {
    const [message, setMessage] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const fullName = "abc asd"; // Replace with dynamic name from auth/user
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
        navigate('/signin');
        setShowDropdown(false);
    };

    useEffect(() => {
        getHome()
            .then(response => { setMessage(response.data) })
            .catch(error => {
                console.log("Error is:", error);
                setMessage('Error in GET');
            })
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
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
