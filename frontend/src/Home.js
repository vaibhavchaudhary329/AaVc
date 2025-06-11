import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('https://aavc.onrender.com/user/home')
            .then(response => { setMessage(response.data) })
            .catch(error => {
                 console.log("Error is:", error); 
                 setMessage('Error in GET');
            })
    }, []);


    return (
        <div style={{ maxWidth: '300px', margin: '100px auto', textAlign: 'center' }}>
            <h2>Home Page</h2>
            <p>{message}</p>
        </div>
    );
}

export default Home;
