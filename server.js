require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// 1. Konfigirasyon CORS pou Netlify ak Vercel
app.use(cors({
  origin: [
    'https://rcglobalht.netlify.app', // 👈 Lyen ou mande a
    'https://rc-frontend-beryl.vercel.app',
    'http://localhost:3000',
    /\.netlify\.app$/, // Asepte tout sou-domèn Netlify
    /\.vercel\.app$/   // Asepte tout sou-domèn Vercel
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// 2. Wout (Routes)
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const productRoutes = require("./routes/product");
app.use("/api/products", productRoutes);

const paymentRoutes = require("./routes/payment");
app.use("/api/payment", paymentRoutes);

// CONNECT MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("Mongo error:", err));

module.exports = app;