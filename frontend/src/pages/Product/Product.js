import React, { useState, useEffect } from "react";
import "./Product.css";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getProducts, getCategories, getProductByCategory, getSearch } from '../../api/api'; // Ensure this path is correct for your updated api.js

function Product() {
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

    const brands = ["Apple", "Samsung", "Sony", "Nike", "Adidas"];

    const dummyProducts = [
        { id: 1, name: "iPhone 15", brand: "Apple", price: 70000, rating: 4.5 },
        { id: 2, name: "Galaxy S23", brand: "Samsung", price: 65000, rating: 4.2 },
        { id: 3, name: "Sony Headphones", brand: "Sony", price: 15000, rating: 4.1 },
        { id: 4, name: "Nike Shoes", brand: "Nike", price: 8000, rating: 3.9 },
        { id: 5, name: "Adidas Shoes", brand: "Adidas", price: 7500, rating: 4.3 },
        { id: 6, name: "AirPods", brand: "Apple", price: 20000, rating: 4.4 }
    ];
    const [brand, setBrand] = useState(false)
    const [showBrand, setShowBrand] = useState(false)
    const [showPrice, setShowPrice] = useState(false)
    const [showRating, setShowRating] = useState(false)

    const [selectedBrands, setSelectedBrands] = useState([])
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [rating, setRating] = useState("")
    const [sort, setSort] = useState("priceAsc")

    const handleBrandChange = (e) => {

        if (e.target.checked) {
            setBrand([...brand, e.target.value])
        } else {
            setBrand(brand.filter(b => b !== e.target.value))
        }

    }
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

        fetchProducts()

    }, [brand, minPrice, maxPrice, rating, sort])




    const fetchProducts = async () => {
        // const response = await api.get("/api/products", {
        //     params: {
        //         brand: brand.join(","),
        //         minPrice,
        //         maxPrice,
        //         rating,
        //         sort
        //     }
        // })
        // setProducts(response.data)
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

    return (
        <div className="productpage-container">
            <div className="filters-container">
                <h3>Filters</h3>

                <div className="filter-bar">

                    <button onClick={() => setShowBrand(!showBrand)}>
                        Brand ▼
                    </button>

                    <button onClick={() => setShowPrice(!showPrice)}>
                        Price ▼
                    </button>

                    <button onClick={() => setShowRating(!showRating)}>
                        Rating ▼
                    </button>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="priceAsc">Price Low → High</option>
                        <option value="priceDesc">Price High → Low</option>
                    </select>


                    <div className="price-box">

                        <input
                            type="range"
                            min="0"
                            max="100000"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />

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

                    <select onChange={(e) => setRating(e.target.value)}>

                        <option value="">All</option>
                        <option value="4">4★ & above</option>
                        <option value="3">3★ & above</option>
                        <option value="2">2★ & above</option>

                    </select>


                </div>


                {showBrand && (
                    <div className="dropdown">

                        {brands.map((b) => (
                            <label key={b}>
                                <input
                                    type="checkbox"
                                    value={b}
                                    onChange={handleBrandChange}
                                />
                                {b}
                            </label>
                        ))}

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

/*

/api/products?
brand=Apple,Sony
&minPrice=1000
&maxPrice=50000
&rating=4
&sort=priceAsc




/api/products?
brand=Apple,Sony
&minPrice=1000
&maxPrice=50000
&rating=4
&sort=priceAsc



*/