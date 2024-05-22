import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchProduct from "./SearchProduct";
import "./Navbar.css";

const Navbar = () => {
  // State for search query, products, and authentication status
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [setError] = useState(null);

  // Function to fetch products data from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5500/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products data when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.Description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-custom">
      <div className="container-navbar">
        <div className="search-input">
          <SearchProduct
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredProducts={filteredProducts}
          />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <NavItem link="/ShopFlowers" text="Shop Flowers" />
            <NavItem link="/Contact" text="Contact" />
          </ul>
          <span className="navbar-brand">BloomDrop</span>
          <ul className="navbar-nav ml-auto">
            {isAuthenticated ? (
              <li className="nav-item">Welcome</li>
            ) : (
              <>
                <NavItem link="/signin" text="Sign In" />
                <NavItem link="/signup" text="Sign Up" />
              </>
            )}
            <NavItem link="/cart" text="Cart" />
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Component for individual navigation items
const NavItem = ({ link, text }) => {
  return (
    <li className="nav-item">
      <Link className="nav-link" to={link}>
        {text}
      </Link>
    </li>
  );
};

export default Navbar;
