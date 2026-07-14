const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Coffee = require("../models/Coffee");

// Helper: populate cart with coffee details and compute totals
const getPopulatedCart = async (userId) => {
  const user = await User.findById(userId).populate("cart.coffee");
  const items = user.cart.filter((item) => item.coffee); // drop orphaned refs

  const subtotal = items.reduce(
    (sum, item) => sum + item.coffee.price * item.quantity,
    0
  );

  return { items, subtotal, count: items.reduce((n, i) => n + i.quantity, 0) };
};

// @desc    Get current user's cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await getPopulatedCart(req.user._id);
  res.status(200).json({ success: true, ...cart });
});

// @desc    Add item to cart (or increase quantity if it already exists)
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { coffeeId, quantity = 1 } = req.body;

  if (!coffeeId) {
    res.status(400);
    throw new Error("coffeeId is required");
  }

  const coffee = await Coffee.findById(coffeeId);
  if (!coffee) {
    res.status(404);
    throw new Error("Coffee item not found");
  }

  const user = await User.findById(req.user._id);
  const existingItem = user.cart.find(
    (item) => item.coffee.toString() === coffeeId
  );

  if (existingItem) {
    existingItem.quantity += Number(quantity);
  } else {
    user.cart.push({ coffee: coffeeId, quantity: Number(quantity) });
  }

  await user.save();
  const cart = await getPopulatedCart(user._id);
  res.status(200).json({ success: true, ...cart });
});

// @desc    Update quantity of a cart item
// @route   PUT /api/cart/:coffeeId
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const { coffeeId } = req.params;

  if (!quantity || quantity < 1) {
    res.status(400);
    throw new Error("Quantity must be at least 1");
  }

  const user = await User.findById(req.user._id);
  const item = user.cart.find((i) => i.coffee.toString() === coffeeId);

  if (!item) {
    res.status(404);
    throw new Error("Item not found in cart");
  }

  item.quantity = Number(quantity);
  await user.save();

  const cart = await getPopulatedCart(user._id);
  res.status(200).json({ success: true, ...cart });
});

// @desc    Remove a single item from cart
// @route   DELETE /api/cart/:coffeeId
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const { coffeeId } = req.params;

  const user = await User.findById(req.user._id);
  user.cart = user.cart.filter((i) => i.coffee.toString() !== coffeeId);
  await user.save();

  const cart = await getPopulatedCart(user._id);
  res.status(200).json({ success: true, ...cart });
});

// @desc    Clear entire cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.cart = [];
  await user.save();
  res.status(200).json({ success: true, items: [], subtotal: 0, count: 0 });
});

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
