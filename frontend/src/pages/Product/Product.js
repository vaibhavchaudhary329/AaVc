import React, { useState, useEffect } from "react";
import "./Product.css";
import { useNavigate, useParams } from 'react-router-dom';
import { getProducts, getCategories, getProductByCategory, getSearch } from '../../api/api'; // Ensure this path is correct for your updated api.js

function Product() {
    const [search, setSearch] = useState("");
    const [maxPrice, setMaxPrice] = useState(1000);
    const [minRating, setMinRating] = useState(0);
    const [products, setProducts] = useState([]);
    // const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { categoryId } = useParams();
    console.log("ID: ", categoryId)

    const handleProductClick = (product) => {
        console.log("P: ",product);
        navigate(`/home/productdetail`, { state: { product } })
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                // setProducts(response);
            } catch (error) {
                console.error("Error is", error);
                setError('Error in User Home API');
            }
        };

        fetchProducts();
    }, [])


    useEffect(() => {
        const fetchProductByCategory = async () => {
            try {
                const response = await getProductByCategory(categoryId);
                setProducts(response);
                // console.log("Categories: Products ", response);
            } catch (error) {
                console.error("Error is", error);
                setError('Error in User Home API');
            }
        };

        fetchProductByCategory();
    }, [])

    // const filteredProducts = products.filter(
    //     (p) =>
    //         p.name.toLowerCase().includes(search.toLowerCase()) &&
    //         p.price <= maxPrice &&
    //         p.rating >= minRating
    // );

    return (
        <div className="app-container">  
            <div className="main">
                {/* Filters */}
                <aside className="filters">
                    <h3>Filters</h3>

                    <div className="filter-group">
                        <label>Max Price (₹)</label>
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Minimum Rating</label>
                        <select onChange={(e) => setMinRating(e.target.value)}>
                            <option value="0">All</option>
                            <option value="3">3 ★ & above</option>
                            <option value="4">4 ★ & above</option>
                            <option value="4.5">4.5 ★ & above</option>
                        </select>
                    </div>
                </aside>

                {/* Products */}
                <section className="productgrid">
                    {/* {products.map((product) => (
                        <div className="product-card" key={product.id}>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>₹{product.price}</p>
                            <p>Stock: {product.stock}</p>
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                style={{ width: "200px", height: "200px", objectFit: "cover" }}
                            />
                        </div>
                    ))} */}

                    {products.map((product) => (
                        <div className="product-card" key={product.id} onClick={() => handleProductClick(product)}>
                            <h3>{product.name}</h3>
                            {/* <p>{product.description}</p> */}
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                style={{ width: "200px", height: "200px", objectFit: "cover" }}
                            />
                        </div>
                    ))}


                </section>
            </div>
        </div>
    );
}

export default Product;
