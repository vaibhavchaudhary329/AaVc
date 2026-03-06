import React, { useState, useEffect } from "react";
import "./Product.css";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getProducts, getCategories, getProductByCategory, getSearch } from '../../api/api'; // Ensure this path is correct for your updated api.js

function Product() {
    const [maxPrice, setMaxPrice] = useState(1000);
    const [minRating, setMinRating] = useState(0);
    // const [searchedProduct, setSearchedProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q");
    const { categoryId } = useParams();
    const [isSearch, setIsSearch] = useState(false);
    const searchProduct = async (searcheditem) => {
        try {
            const response = await getSearch(searcheditem);
            setProducts(response);
            console.log("Search: ", response);
        } catch (error) {
            console.error("Error is", error);
            setError('Error in User Home API');
        }
    };

    const handleProductClick = (product) => {
        navigate(`/home/productdetail`, { state: { product } });
    }

    useEffect(() => {
        if (query) {
            setIsSearch(true);
            searchProduct(query);
        }
    })

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
                < section className="product-grid">
                    {isSearch && <span>{"Showing Result for"} {query}  </span>}
                    {products.map((product) => (
                        <div className="product-card" key={product.id} onClick={() => handleProductClick(product)}>
                            <h3>{product.name}</h3>
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                style={{ width: "200px", height: "200px", objectFit: "cover" }}
                            />
                            <p className="price">₹{product.price}</p>
                            <p className="rating">{product.stock !== 0 ? 'In Stock' : 'Out of Stock'}</p>
                        </div>
                    ))}
                </section>

            </div>
        </div>
    );
}

export default Product;
