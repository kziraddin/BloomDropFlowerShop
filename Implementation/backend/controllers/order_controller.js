const Order = require("../models/order_model");

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.findAll();
    // Send the fetched orders as a JSON response
    res.json(orders);
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  const orderId = req.params.id;
  try {
    // Find the order by its ID
    const order = await Order.findByPk(orderId);
    if (!order) {
      // If order not found, send 404 status with error message
      return res.status(404).json({ error: "Order not found" });
    }
    // Send the found order as a JSON response
    res.json(order);
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  const { UserID, OrderDate, DeliveryDate, TotalAmount } = req.body;
  try {
    // Create a new order with the provided data
    const order = await Order.create({
      UserID,
      OrderDate,
      DeliveryDate,
      TotalAmount,
    });
    // Send a 201 status with the created order as a JSON response
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update order by ID
exports.updateOrderById = async (req, res) => {
  const orderId = req.params.id;
  const { UserID, OrderDate, DeliveryDate, TotalAmount } = req.body;
  try {
    // Find the order by its ID
    const order = await Order.findByPk(orderId);
    if (!order) {
      // If order not found, send 404 status with error message
      return res.status(404).json({ error: "Order not found" });
    }
    await order.update({ UserID, OrderDate, DeliveryDate, TotalAmount });
    res.json(order);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete order by ID
exports.deleteOrderById = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    await order.destroy();
    // Send a success message as a JSON response
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
