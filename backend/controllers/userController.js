const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @desc    Get logged-in user's profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({ success: true, user: user.toSafeObject() });
});

// @desc    Update logged-in user's profile (name, address, avatar)
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = req.body.name ?? user.name;
  user.avatar = req.body.avatar ?? user.avatar;
  if (req.body.address) {
    user.address = { ...user.address?.toObject?.(), ...req.body.address };
  }

  if (req.body.password) {
    user.password = req.body.password; // pre-save hook will hash it
  }

  const updatedUser = await user.save();
  res.status(200).json({ success: true, user: updatedUser.toSafeObject() });
});

module.exports = { getProfile, updateProfile };
