const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const Coffee = require("../models/Coffee");
const User = require("../models/User");

// @desc    Get dashboard summary stats (revenue, orders, users, low stock, best sellers)
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalUsers, totalCoffees, totalOrders, revenueAgg, statusCounts, lowStock, recentOrders, topSellers] =
    await Promise.all([
      User.countDocuments(),
      Coffee.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { status: { $ne: "cancelled" } } },
        { $group: { _id: null, revenue: { $sum: "$totalPrice" } } },
      ]),
      Order.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Coffee.find({ stock: { $lte: 5 } }).select("name stock").limit(10),
      Order.find().sort({ createdAt: -1 }).limit(5).populate("user", "name"),
      Order.aggregate([
        { $unwind: "$items" },
        {
          $group: {
            _id: "$items.coffee",
            name: { $first: "$items.name" },
            unitsSold: { $sum: "$items.quantity" },
          },
        },
        { $sort: { unitsSold: -1 } },
        { $limit: 5 },
      ]),
    ]);

  res.status(200).json({
    success: true,
    stats: {
      totalUsers,
      totalCoffees,
      totalOrders,
      totalRevenue: revenueAgg[0]?.revenue || 0,
      ordersByStatus: statusCounts.reduce((acc, s) => {
        acc[s._id] = s.count;
        return acc;
      }, {}),
      lowStockItems: lowStock,
      recentOrders,
      topSellers,
    },
  });
});

module.exports = { getDashboardStats };
