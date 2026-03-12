import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { getHome, getUserDetails } from '../../api/api';
import Category from '../Product/Category/Category';

function Home() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const menuRef = useRef(null);
    const navigate = useNavigate()
    const [userData, setUserData] = useState('');
    let identifier = localStorage.getItem("userinfo");
    if (!identifier) {
        identifier = localStorage.getItem("googleuserid");
    }

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //         navigate("/signin");
    //     }
    // }, [navigate]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await getHome();
    //             setMessage(response);
    //             navigate("/home");
    //         } catch (error) {
    //             console.error("Error is", error);
    //             setError('Error in User Home API');
    //         }
    //     };

    //     const fetchUserData = async () => {
    //         try {
    //             const response = await getUserDetails({ identifier: identifier });
    //             const fullName = response.fullName;
    //             const generateInitials = fullName.split(" ").map(name => name[0]).join("").toUpperCase();
    //             setInitials(generateInitials);
    //             setUserData({ fullName: response.fullName, email: response.email, mobile: response.mobile });

    //         } catch (error) {
    //             console.error("Error is", error.response.data.message);
    //             setError('Error in fetching user data');
    //             // alert("Error from home fetchuserdata ");
    //             navigate('/home')
    //         }
    //     };

    //     if (identifier) {
    //         fetchUserData();
    //         fetchData();
    //     }
    //     else {
    //         setError("Identider is null");
    //     }
    // }, []);

    return (
        <div className="home-container">
            {error && <p style={{ color: 'red', textAlign: 'left' }}>{error}</p>}
            <Category></Category>

        </div>
    );
}

export default Home;