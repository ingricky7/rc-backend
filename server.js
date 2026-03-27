require("dotenv").config({ path: __dirname + "/.env" });

console.log("MONGO_URI:", process.env.MONGO_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // 👈 AJOUTE SA

const app = express();

app.use(cors()); // 👈 AJOUTE SA
app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const productRoutes = require("./routes/product");
app.use("/api/products", productRoutes);

// CONNECT MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("Mongo error:", err));
