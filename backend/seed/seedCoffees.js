require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Coffee = require("../models/Coffee");
const User = require("../models/User");

const sampleCoffees = [
  {
    name: "Classic Espresso",
    description: "A bold, concentrated shot of our signature dark roast blend.",
    category: "hot",
    price: 350,
    stock: 50,
    isFeatured: true,
    tags: ["espresso", "bold", "classic"],
  },
  {
    name: "Caramel Macchiato",
    description: "Espresso layered with steamed milk and rich caramel drizzle.",
    category: "hot",
    price: 550,
    stock: 40,
    isFeatured: true,
    tags: ["sweet", "caramel", "milk"],
  },
  {
    name: "Iced Vanilla Latte",
    description: "Smooth espresso and vanilla syrup over ice with cold milk.",
    category: "iced",
    price: 500,
    stock: 35,
    tags: ["iced", "vanilla", "refreshing"],
  },
  {
    name: "Cold Brew",
    description: "Slow-steeped for 18 hours for a smooth, low-acidity finish.",
    category: "iced",
    price: 480,
    stock: 30,
    tags: ["cold brew", "smooth"],
  },
  {
    name: "Signature Bean & Brew Blend",
    description: "Our house special — a specialty pour-over with tasting notes of chocolate and citrus.",
    category: "specialty",
    price: 650,
    stock: 20,
    isFeatured: true,
    tags: ["specialty", "pour-over", "house-blend"],
  },
  {
    name: "Ethiopian Yirgacheffe Beans (250g)",
    description: "Whole beans with bright floral and citrus notes, medium roast.",
    category: "beans",
    price: 1400,
    stock: 15,
    tags: ["beans", "whole-bean", "ethiopian"],
  },
  {
    name: "Butter Croissant",
    description: "Flaky, buttery croissant baked fresh daily — the perfect coffee companion.",
    category: "pastry",
    price: 300,
    stock: 25,
    tags: ["pastry", "bakery"],
  },
  {
    name: "Bean & Brew Ceramic Mug",
    description: "Our signature 350ml ceramic mug featuring the Bean & Brew logo.",
    category: "merch",
    price: 1200,
    stock: 60,
    tags: ["merch", "mug"],
  },
];

const seedData = async () => {
  await connectDB();

  try {
    await Coffee.deleteMany();
    await Coffee.insertMany(sampleCoffees);

    const adminExists = await User.findOne({ email: "admin@beanandbrew.com" });
    if (!adminExists) {
      await User.create({
        name: "Bean & Brew Admin",
        email: "admin@beanandbrew.com",
        password: "Admin@123",
        role: "admin",
      });
      console.log("Admin user created: admin@beanandbrew.com / Admin@123");
    }

    console.log(`Seeded ${sampleCoffees.length} coffee items successfully.`);
    process.exit();
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  await connectDB();
  try {
    await Coffee.deleteMany();
    console.log("All coffee data destroyed.");
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv.includes("--destroy")) {
  destroyData();
} else {
  seedData();
}
