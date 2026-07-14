const asyncHandler = require("express-async-handler");
const Coffee = require("../models/Coffee");
const { cloudinary, uploadBufferToCloudinary } = require("../config/cloudinary");

// @desc    Get all coffees (supports search, category filter, pagination) - powers /menu
// @route   GET /api/coffees
// @access  Public
const getCoffees = asyncHandler(async (req, res) => {
  const { keyword, category, page = 1, limit = 12, featured } = req.query;

  const query = {};

  if (keyword) {
    query.$text = { $search: keyword };
  }
  if (category) {
    query.category = category;
  }
  if (featured === "true") {
    query.isFeatured = true;
  }

  const pageNum = Math.max(Number(page), 1);
  const limitNum = Math.max(Number(limit), 1);

  const total = await Coffee.countDocuments(query);
  const coffees = await Coffee.find(query)
    .sort({ createdAt: -1 })
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum);

  res.status(200).json({
    success: true,
    count: coffees.length,
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
    coffees,
  });
});

// @desc    Get single coffee by id or slug - powers /coffee/:id
// @route   GET /api/coffees/:id
// @access  Public
const getCoffeeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const isObjectId = id.match(/^[0-9a-fA-F]{24}$/);

  const coffee = isObjectId
    ? await Coffee.findById(id)
    : await Coffee.findOne({ slug: id });

  if (!coffee) {
    res.status(404);
    throw new Error("Coffee item not found");
  }

  res.status(200).json({ success: true, coffee });
});

// @desc    Create a new coffee item - powers /admin/add-coffee
// @route   POST /api/coffees
// @access  Private/Admin
const createCoffee = asyncHandler(async (req, res) => {
  const { name, description, category, price, stock, sizes, tags, isFeatured, isAvailable } = req.body;

  if (!name || !description || price === undefined) {
    res.status(400);
    throw new Error("Name, description, and price are required");
  }

  const coffee = new Coffee({
    name,
    description,
    category,
    price,
    stock,
    sizes,
    tags,
    isFeatured,
    isAvailable,
  });

  if (req.file) {
    const result = await uploadBufferToCloudinary(req.file.buffer);
    coffee.image = { url: result.url, publicId: result.publicId };
  } else if (req.body.image) {
    coffee.image = { url: req.body.image, publicId: "" };
  }

  const created = await coffee.save();
  res.status(201).json({ success: true, coffee: created });
});

// @desc    Update a coffee item - powers /admin/edit-coffee/:id
// @route   PUT /api/coffees/:id
// @access  Private/Admin
const updateCoffee = asyncHandler(async (req, res) => {
  const coffee = await Coffee.findById(req.params.id);

  if (!coffee) {
    res.status(404);
    throw new Error("Coffee item not found");
  }

  const fields = [
    "name",
    "description",
    "category",
    "price",
    "stock",
    "sizes",
    "tags",
    "isFeatured",
    "isAvailable",
  ];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) coffee[field] = req.body[field];
  });

  if (req.file) {
    if (coffee.image?.publicId) {
      await cloudinary.uploader.destroy(coffee.image.publicId).catch(() => {});
    }
    const result = await uploadBufferToCloudinary(req.file.buffer);
    coffee.image = { url: result.url, publicId: result.publicId };
  }

  const updated = await coffee.save();
  res.status(200).json({ success: true, coffee: updated });
});

// @desc    Delete a coffee item - powers /admin/manage-coffee
// @route   DELETE /api/coffees/:id
// @access  Private/Admin
const deleteCoffee = asyncHandler(async (req, res) => {
  const coffee = await Coffee.findById(req.params.id);

  if (!coffee) {
    res.status(404);
    throw new Error("Coffee item not found");
  }

  if (coffee.image?.publicId) {
    await cloudinary.uploader.destroy(coffee.image.publicId).catch(() => {});
  }

  await coffee.deleteOne();
  res.status(200).json({ success: true, message: "Coffee item removed" });
});

// @desc    Add a review to a coffee item
// @route   POST /api/coffees/:id/reviews
// @access  Private
const addCoffeeReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const coffee = await Coffee.findById(req.params.id);

  if (!coffee) {
    res.status(404);
    throw new Error("Coffee item not found");
  }

  const alreadyReviewed = coffee.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) {
    res.status(400);
    throw new Error("You have already reviewed this item");
  }

  coffee.reviews.push({
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  });

  coffee.numReviews = coffee.reviews.length;
  coffee.rating =
    coffee.reviews.reduce((acc, r) => acc + r.rating, 0) / coffee.reviews.length;

  await coffee.save();
  res.status(201).json({ success: true, message: "Review added" });
});

module.exports = {
  getCoffees,
  getCoffeeById,
  createCoffee,
  updateCoffee,
  deleteCoffee,
  addCoffeeReview,
};
