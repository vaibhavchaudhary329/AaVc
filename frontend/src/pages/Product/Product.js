import React, { useState, useEffect, useRef } from "react";
import "./Product.css";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getProducts, getProductByCategory, getSearch, getProductsByFilter } from '../../api/api'; // Ensure this path is correct for your updated api.js

function Product() {
    // const [searchedProduct, setSearchedProduct] = useState([]);
    const dropdownRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q");
    const { categoryId } = useParams();
    const [isSearch, setIsSearch] = useState(false);

    const brands = ["Apple", "Samsung", "Sony", "Nike", "Adidas"];


    const [brandname, setBrandName] = useState([])
    const [showBrand, setShowBrand] = useState(false)
    const [showPrice, setShowPrice] = useState(false)
    const [showRating, setShowRating] = useState(false)
    const [openFilter, setOpenFilter] = useState(null);
    const [selectedBrands, setSelectedBrands] = useState([])
    const [brandSearch, setBrandSearch] = useState("");
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [rating, setRating] = useState("")
    const [sort, setSort] = useState("highly_rated")

    // CLEAR BRAND
    const clearBrands = () => {
        setSelectedBrands([])
    }


    // FILTER SEARCHED BRANDS
    const filteredBrands = brands.filter(b =>
        b.toLowerCase().includes(brandSearch.toLowerCase())
    );

    const handleBrandChange = (brand) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter(b => b !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };
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
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenFilter(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => { document.removeEventListener("mousedown", handleClickOutside); };
    }, []);

    const buildFilters = () => {
        const filters = { q: '' };
        if (selectedBrands.length) filters.brands = selectedBrands.join(",");
        if (minPrice) filters.minPrice = minPrice;
        if (maxPrice) filters.maxPrice = maxPrice;
        if (rating) filters.rating = rating;
        if (sort) filters.sort = sort;
        return filters;
    };

    useEffect(() => {
        const productsFilter = async () => {
            try {
                const filters = buildFilters();
                const response = await getProductsByFilter(filters);
                setProducts(response.content);
            } catch (error) {
                console.error("Error is", error);
                setError('Error in User Home API');
            }
        };
        productsFilter();
    }, [[selectedBrands, minPrice, maxPrice, rating, sort]])

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

    return (
        <div className="productpage-container">
            <div className="filters-container">
                <h3>Filters</h3>
                <div className="filter-bar">
                    <button
                        className="filter-pill"
                        onClick={() => setOpenFilter(openFilter === "brand" ? null : "brand")}
                    >
                        Brand ▼
                    </button>
                    <button className="filter-pill" onClick={() => setOpenFilter(openFilter === "price" ? null : "price")}>
                        Price ▼
                    </button>
                    {/* <button className="filter-pill" onClick={() => setShowRating(!showRating)}>
                        Rating ▼
                    </button> */}
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="price_asc">Price Low → High</option>
                        <option value="price_dsc">Price High → Low</option>
                    </select>
                    <select onChange={(e) => setRating(e.target.value)}>
                        <option value="">Rating</option>
                        <option value="4">4★ & above</option>
                        <option value="3">3★ & above</option>
                        <option value="2">2★ & above</option>
                    </select>
                </div>

                {openFilter === "brand" && (
                    <div ref={dropdownRef} className="dropdown-filter">

                        <div className="brand-search-wrapper">
                            <i className="ri-search-line brand-search-icon"></i>

                            <input
                                className="brand-search"
                                placeholder="Find a brand"
                                value={brandSearch}
                                onChange={(e) => setBrandSearch(e.target.value)}
                            />
                        </div>

                        <div className="brand-list">
                            {filteredBrands.map((brand) => (
                                <label key={brand} className="brand-item">

                                    <input
                                        type="checkbox"
                                        checked={selectedBrands.includes(brand)}
                                        onChange={() => handleBrandChange(brand)}
                                    />

                                    <span>{brand}</span>

                                </label>
                            ))}
                        </div>

                        <div className="clear-btn" onClick={clearBrands}>
                            Clear
                        </div>

                    </div>
                )}
                {openFilter === "price" && (
                    <div className="dropdown-filter">
                        <div className="price-slider">
                            <input
                                type="range"
                                min="0"
                                max="100000"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>
                        <div className="price-inputs">
                            <input
                                type="number"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="product-container">
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
