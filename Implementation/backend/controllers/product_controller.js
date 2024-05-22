const Product = require("../models/product_model");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.findAll();
    // Send the fetched products as a JSON response
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { ProductID, Name, Description, Price } = req.body;
  try {
    const product = await Product.create({
      ProductID,
      Name,
      Description,
      Price,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Product by ID
exports.updateProductById = async (req, res) => {
  const productId = req.params.id;
  const { ProductID, Name, Description, Price } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.update({ ProductID, Name, Description, Price });
    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete product by ID
exports.deleteProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
