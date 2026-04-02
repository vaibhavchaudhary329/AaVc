import React, { useState, useEffect } from "react";
import "./Category.css";
import { useNavigate } from 'react-router-dom';
import { getProducts, getCategories, getProductByCategory, getSearch } from '../../../api/api'; // Ensure this path is correct for your updated api.js
import CategoryImage from '../../../assets/images/Categories.jpeg';

function Category() {
    const [maxPrice, setMaxPrice] = useState(1000);
    const [minRating, setMinRating] = useState(0);
    const [searchedProduct, setSearchedProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


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


    const handleCategoryClick = (categoryid) => {
        navigate(`/home/product/${categoryid}`)
    }

    return (
        <div className="app-container">
            {/* Top Search Bar */}
            {/* <header className="header">
                <h2 className="logo" onClick={() => navigate('/home')}>AAVC</h2>
                <input
                    type="text"
                    placeholder="Search for fruits, vegetables, dairy..."
                    value={searchitem}
                    onChange={(e) => setSearchItem(e.target.value)}
                />
                <i className="ri-search-line searchicon" onClick={() => handleSearch(searchitem)} ></i>
            </header> */}

            <div className="main">
                {/* Filters */}

                {/* Products */}
                <section className="product-grid">
                    {categories.map((category) => (
                        <div className="product-card" key={category.id} onClick={() => handleCategoryClick(category.id)}>

                            {/* <p>{category.description}</p> */}
                            <img
                                src={category.imageUrl || CategoryImage}
                                alt={category.description}
                                style={{ width: "200px", height: "200px", objectFit: "cover" }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = CategoryImage;
                                }}
                            />
                            <h3>{category.name}</h3>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}

export default Category;
