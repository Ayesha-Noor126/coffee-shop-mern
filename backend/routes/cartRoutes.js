const express = require("express");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/", clearCart);
router.put("/:coffeeId", updateCartItem);
router.delete("/:coffeeId", removeFromCart);

module.exports = router;
