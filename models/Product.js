const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  type: String, // ebook or course
  fileUrl: String
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
