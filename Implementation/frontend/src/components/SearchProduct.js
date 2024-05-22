import React from "react";
import "./SearchProduct.css";

const SearchProduct = ({ searchQuery, setSearchQuery, filteredProducts }) => {
  // Function to filter products based on the starting letter of the name
  const filterProducts = (products, query) => {
    return products.filter((product) =>
      product.Name.toLowerCase().startsWith(query.toLowerCase())
    );
  };

  // Filtering products based on the current search query
  const filteredByNameProducts = filterProducts(filteredProducts, searchQuery);

  return (
    <div className="search-product">
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search Products"
        aria-label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && filteredByNameProducts.length > 0 && (
        <div className="list">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredByNameProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.Name}</td>
                  <td>{product.Description}</td>
                  <td>${product.Price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
