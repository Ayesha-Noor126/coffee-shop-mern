const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const User = require("../models/User");
const Coffee = require("../models/Coffee");

const SHIPPING_FLAT_RATE = 150; // PKR flat delivery fee
const TAX_RATE = 0; // adjust if sales tax applies

// @desc    Create a new order from the current user's cart - powers /checkout
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { shippingAddress, paymentMethod } = req.body;

  if (!shippingAddress?.fullName || !shippingAddress?.phone || !shippingAddress?.street || !shippingAddress?.city) {
    res.status(400);
    throw new Error("Please provide a complete shipping address");
  }

  const user = await User.findById(req.user._id).populate("cart.coffee");

  if (!user.cart.length) {
    res.status(400);
    throw new Error("Your cart is empty");
  }

  const items = [];
  for (const cartItem of user.cart) {
    const coffee = cartItem.coffee;
    if (!coffee) continue;

    if (coffee.stock < cartItem.quantity) {
      res.status(400);
      throw new Error(`Not enough stock for ${coffee.name}`);
    }

    items.push({
      coffee: coffee._id,
      name: coffee.name,
      image: coffee.image?.url || "",
      quantity: cartItem.quantity,
      price: coffee.price,
    });

    coffee.stock -= cartItem.quantity;
    await coffee.save();
  }

  if (!items.length) {
    res.status(400);
    throw new Error("Your cart items are no longer available");
  }

  const itemsPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shippingPrice = itemsPrice > 3000 ? 0 : SHIPPING_FLAT_RATE;
  const taxPrice = Number((itemsPrice * TAX_RATE).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const order = await Order.create({
    user: req.user._id,
    items,
    shippingAddress,
    paymentMethod: paymentMethod || "cod",
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  });

  // Clear the user's cart after a successful order
  user.cart = [];
  await user.save();

  res.status(201).json({ success: true, order });
});

// @desc    Get logged-in user's order history - powers /orders
// @route   GET /api/orders/my
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: orders.length, orders });
});

// @desc    Get single order by id (owner or admin only)
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  const isOwner = order.user._id.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not authorized to view this order");
  }

  res.status(200).json({ success: true, order });
});

// @desc    Get all orders (admin) - powers /dashboard
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const query = {};
  if (status) query.status = status;

  const pageNum = Math.max(Number(page), 1);
  const limitNum = Math.max(Number(limit), 1);

  const total = await Order.countDocuments(query);
  const orders = await Order.find(query)
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum);

  res.status(200).json({
    success: true,
    count: orders.length,
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
    orders,
  });
});

// @desc    Update order status (admin) - e.g. confirmed -> preparing -> delivered
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = status;
  if (status === "delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save();
  res.status(200).json({ success: true, order });
});

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};
