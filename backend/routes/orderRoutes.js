const express = require("express");
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.post("/", createOrder); // /checkout submits here
router.get("/my", getMyOrders); // /orders page
router.get("/", adminOnly, getAllOrders); // admin: all orders
router.get("/:id", getOrderById);
router.put("/:id/status", adminOnly, updateOrderStatus);

module.exports = router;
