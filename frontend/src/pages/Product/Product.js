import React, { useState } from "react";
import "./Product.css";

const products = [
    {
        id: 1,
        name: "Fresh Apple",
        description: "Crisp & juicy red apples",
        price: 120,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce"
    },
    {
        id: 2,
        name: "Organic Banana",
        description: "Naturally ripened bananas",
        price: 60,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1574226516831-e1dff420e12b"
    },
    {
        id: 3,
        name: "Fresh Milk",
        description: "1L full cream milk",
        price: 55,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1585238342028-4bbc8c9ec43b"
    }
];

function Product() {
    const [search, setSearch] = useState("");
    const [maxPrice, setMaxPrice] = useState(1000);
    const [minRating, setMinRating] = useState(0);

    const filteredProducts = products.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) &&
            p.price <= maxPrice &&
            p.rating >= minRating
    );

    return (
        <div className="app-container">
            {/* Top Search Bar */}
            <header className="header">
                <h2 className="logo">AAVC</h2>
                <input
                    type="text"
                    placeholder="Search for fruits, vegetables, dairy..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </header>

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
                <section className="product-grid">
                    {filteredProducts.map((p) => (
                        <div className="product-card" key={p.id}>
                            <img src={p.image} alt={p.name} />
                            <div className="product-info">
                                <h4>{p.name}</h4>
                                <p className="desc">{p.description}</p>
                                <div className="bottom">
                                    <span className="price">₹{p.price}</span>
                                    <span className="rating">⭐ {p.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}

export default Product;
