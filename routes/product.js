const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// ADD PRODUCT (ADMIN ONLY)
router.post("/", auth, admin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ msg: "Product added", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
