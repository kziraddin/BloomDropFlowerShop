const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product_controller");

// Routes to Endpoints
router.get("/", ProductController.getAllProducts); // Route to get all Products
router.get("/:id", ProductController.getProductById); // Route to get product by ID
router.post("/", ProductController.createProduct); // Route to create a new product
router.put("/:id", ProductController.updateProductById); // Route to update product by ID
router.delete("/:id", ProductController.deleteProductById); // Route to delete product by ID

module.exports = router;
