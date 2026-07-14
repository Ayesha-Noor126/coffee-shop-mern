const express = require("express");
const {
  getCoffees,
  getCoffeeById,
  createCoffee,
  updateCoffee,
  deleteCoffee,
  addCoffeeReview,
} = require("../controllers/coffeeController");
const { protect, adminOnly } = require("../middleware/auth");
const { upload } = require("../config/cloudinary");

const router = express.Router();

router.get("/", getCoffees);
router.get("/:id", getCoffeeById);
router.post("/:id/reviews", protect, addCoffeeReview);

router.post("/", protect, adminOnly, upload.single("image"), createCoffee);
router.put("/:id", protect, adminOnly, upload.single("image"), updateCoffee);
router.delete("/:id", protect, adminOnly, deleteCoffee);

module.exports = router;
