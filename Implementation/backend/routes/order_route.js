const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order_controller");

// Routes to Endpoints
router.get("/", OrderController.getAllOrders); // Route to get all orders
router.get("/:id", OrderController.getOrderById); // Route to get order by ID
router.post("/", OrderController.createOrder); // Route to create a new order
router.put("/:id", OrderController.updateOrderById); // Route to update order by ID
router.delete("/:id", OrderController.deleteOrderById); // Route to delete order by ID

module.exports = router;
