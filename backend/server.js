const path = require("path");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const coffeeRoutes = require("./routes/coffeeRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

connectDB();

const app = express();

// Core middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Bean & Brew API is running" });
});

// Routes — mirrors the React Router paths in App.jsx
app.use("/api/auth", authRoutes); // /login, /register
app.use("/api/users", userRoutes); // /profile
app.use("/api/coffees", coffeeRoutes); // /menu, /coffee/:id, /admin/*-coffee
app.use("/api/cart", cartRoutes); // /cart
app.use("/api/orders", orderRoutes); // /checkout, /orders
app.use("/api/admin", adminRoutes); // /dashboard

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Bean & Brew API running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});

module.exports = app;
