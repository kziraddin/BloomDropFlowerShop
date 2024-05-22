const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

// Import database configuration
const dbConfig = require("../Implementation/backend/config/db.config.js");

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
});

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, "frontend/public")));

// Handle CORS and body parsing middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Import routes
const userRoutes = require("../Implementation/backend/routes/user_route.js");
const orderRoutes = require("../Implementation/backend/routes/order_route.js");
const productRoutes = require("../Implementation/backend/routes/product_route.js");

// API Endpoints
app.use("/users", userRoutes); // Route for fetching users
app.use("/orders", orderRoutes); // Route for fetching orders
app.use("/products", productRoutes); // Route for fetching products
app.use("/users/register", userRoutes); //Route for create new user
app.use("users/login", userRoutes);
//app.use("users/logout", userRoutes);

//All other requests will be served the index.html file from the build directory
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "public", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 5577;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
