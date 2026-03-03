import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getProducts, getCategories, getProductByCategory, getSearch, getHome, getUserDetails } from '../api/api'; // Ensure this path is correct for your updated api.js
import { FaCircle } from 'react-icons/fa'; // User avatar icon


function Header() {
    let identifier = localStorage.getItem("userinfo");
    if (!identifier) {
        identifier = localStorage.getItem("googleuserid");
    }
    const [initials, setInitials] = useState('');
    const [userData, setUserData] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchitem, setSearchItem] = useState("");
    const [categories, setCategories] = useState([]);
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


    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const response = await getProducts();
    //             setProducts(response);
    //         } catch (error) {
    //             console.error("Error is", error);
    //             setError('Error in User Home API');
    //         }
    //     };

    //     fetchProducts();
    // }, [])


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response);
            } catch (error) {
                console.error("Error is", error);
                setError('Error in User Home API');
            }
        };

        fetchCategories();
    }, [])


    // useEffect(() => {
    //     const fetchProductByCategory = async () => {
    //         try {
    //             const response = await getProductByCategory();
    //             // setCategories(response);
    //             // console.log("Categories: Products ", response);
    //         } catch (error) {
    //             console.error("Error is", error);
    //             setError('Error in User Home API');
    //         }
    //     };

    //     fetchProductByCategory();
    // }, [])

    const handleSearch = (searchitem) => {
        if (!searchitem.trim()) return;
        navigate(`/home/search?q=${searchitem}`)
    }

    return (
        <div className="app-container">
            <header className="header">
                <div>
                    <i className="ri-arrow-left-line back-icon" onClick={() => navigate(-1)} ></i>
                </div>
                <div className="logo-header">
                    <h2 className="logo" onClick={() => navigate('/home')}>AAVC</h2>
                </div>
                <div className="input-search-header">
                    <input
                        type="text"
                        placeholder="Search for fruits, vegetables, dairy..."
                        value={searchitem}
                        onChange={(e) => setSearchItem(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch(searchitem);
                        }}
                    />
                    <i className="ri-search-line searchicon" onClick={() => handleSearch(searchitem)} ></i>
                </div>

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
            </header>
        </div>
    );
}

export default Header;
