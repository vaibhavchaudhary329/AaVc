import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getHome, getUserDetails } from '../../api/api'; // Ensure this path is correct for your updated api.js
import { FaCircle } from 'react-icons/fa'; // User avatar icon
import "../Header/Header.css"

function Header() {
    let identifier = localStorage.getItem("userinfo");
    if (!identifier) {
        identifier = localStorage.getItem("googleuserid");
    }
    const [initials, setInitials] = useState('');
    const [userData, setUserData] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchitem, setSearchItem] = useState("");
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getHome();
                setMessage(response);
                navigate("/home");
            } catch (error) {
                console.error("Error is", error);
                setError('Error in Welcome Msg ');
            }
        };

        const fetchUserData = async () => {
            try {
                const response = await getUserDetails({ identifier: identifier });
                const fullName = response.fullName;
                const generateInitials = fullName.split(" ").map(name => name[0]).join("").toUpperCase();
                setInitials(generateInitials);
                setUserData({ fullName: response.fullName, email: response.email, mobile: response.mobile });

            } catch (error) {
                console.error("Error is", error.response?.data.message);
                setError('Error in fetching user data header');
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

    const handleSearch = (searchitem) => {
        if (!searchitem.trim()) return;
        navigate(`/home/search?q=${searchitem}`)
    }

    return (
        <div className="header-container">
            {error && <p style={{ color: 'red', textAlign: 'left' }}>{error}</p>}

            {!error && <div className="main-header">
                <div className="logo-header">
                    <h2 className="logo" onClick={() => navigate('/home')}>AAVC</h2>
                </div>
                <div className="address">
                    <div className="delivery-type">Pickup or Delivery</div>
                    <div className="delivery-location">
                        <i className="ri-map-pin-line"></i>
                        Mumbai
                    </div>
                </div>
                <div className="input-search-header">
                    <i className="ri-search-line searchicon" onClick={() => handleSearch(searchitem)} ></i>

                    <input
                        type="text"
                        placeholder="Search for fruits, vegetables, dairy..."
                        value={searchitem}
                        onChange={(e) => setSearchItem(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch(searchitem);
                        }}
                    />
                </div>
                <div className="header-right">
                    <i className="ri-shopping-cart-2-line cart-icon"></i>
                    <div className="avatar-wrapper" onClick={toggleDropdown}>
                        <FaCircle className="avatar-circle" />
                        <div className="avatar-initials">{initials}</div>
                    </div>
                </div>
                {showDropdown && (
                    <div className="dropdown-header">
                        <div onClick={handleEdit}>Profile</div>
                        <div onClick={handlePasswordChange}>Change Password</div>
                        <div onClick={handleLogout}>Logout</div>
                    </div>
                )}
            </div>}

        </div >
    );
}

export default Header;
