import React, { useEffect, useState, useRef } from 'react';
import { FaCircle } from 'react-icons/fa'; // User avatar icon
import './Home.css'; // Import your custom CSS
import { useNavigate } from 'react-router-dom';
import { getHome, getUserDetails } from '../../api/api'


function Home() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const [initials, setInitials] = useState('');
    const [userData, setUserData] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const username = localStorage.getItem("userinfo");
    const toggleDropdown = () => setShowDropdown(prev => !prev);
    const handleEdit = () => {
        setShowDropdown(false);
        navigate('/edituser', { state: { fullName: userData.fullName, email: userData.email, mobile: userData.mobile } });
    };
    const handleLogout = () => {
        localStorage.removeItem("userinfo");
        navigate('/signin');
        setShowDropdown(false);
    };
    console.log("From Home ", username);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getHome();
                setMessage(response);
            } catch (error) {
                console.error("Error is", error);
                setError('Error fetching home data');
            }
        };

        const fetchUserData = async () => {
            try {
                const response = await getUserDetails({ username: username });
                const fullName = response.fullName;
                const generateInitials = fullName.split(" ").map(name => name[0]).join("").toUpperCase();
                setInitials(generateInitials);
                setUserData({ fullName: response.fullName, email: response.email, mobile: response.mobile });
                console.log("RES: ", response);

            } catch (error) {
                console.error("Error is", error);
                setError('Error fetching home data');
            }
        };
        fetchUserData();
        fetchData();
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
             {error && <p style={{ color: 'red', textAlign: 'left' }}>{error}</p>}
        </div>
    );
}

export default Home;
