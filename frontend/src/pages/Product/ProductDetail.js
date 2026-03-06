import React, { useState, useEffect } from "react";
import "./Product.css";
import { useNavigate, useLocation } from 'react-router-dom';

import { getProducts, getCategories, getProductByCategory, getSearch } from '../../api/api'; // Ensure this path is correct for your updated api.js


function ProductDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;
    const [search, setSearch] = useState("");
    const [maxPrice, setMaxPrice] = useState(1000);
    const [minRating, setMinRating] = useState(0);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    console.log("P:", product);


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


    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const response = await getCategories();
    //             setCategories(response);
    //         } catch (error) {
    //             console.error("Error is", error);
    //             setError('Error in User Home API');
    //         }
    //     };

    //     fetchCategories();
    // }, [])


    //  useEffect(() => {
    //     const fetchProductByCategory = async () => {
    //         try {
    //             const response = await getProductByCategory();
    //            // setCategories(response);
    //             // console.log("Categories: Products ", response);
    //         } catch (error) {
    //             console.error("Error is", error);
    //             setError('Error in User Home API');
    //         }
    //     };

    //    fetchProductByCategory();
    // }, [])


    //  useEffect(() => {
    //     console.log("This is Search")
    //     const searchProduct = async () => {
    //         try {
    //             const response = await getSearch('iphone');
    //             // setCategories(response);
    //             console.log("Search: ", response);
    //         } catch (error) {
    //             console.error("Error is", error);
    //             setError('Error in User Home API');
    //         }
    //     };

    //    searchProduct();
    // }, [])



    // const filteredProducts = products.filter(
    //     (p) =>
    //         p.name.toLowerCase().includes(search.toLowerCase()) &&
    //         p.price <= maxPrice &&
    //         p.rating >= minRating
    // );

    return (
        <div className="app-container">
            <div className="main">
                <section className="product-grid">
                    <div className="product-card">
                        <h3>{product.name}</h3>
                        <ul>
                            {product.description.split("\\n").map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <p className="price">₹{product.price}</p>
                       <p className="rating">{product.stock !==0 ? 'In Stock' : 'Out of Stock' }</p>
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            style={{ width: "200px", height: "200px", objectFit: "cover" }}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ProductDetail;
