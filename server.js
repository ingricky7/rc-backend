require("dotenv").config({ path: __dirname + "/.env" });

console.log("MONGO_URI:", process.env.MONGO_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// 1. Konfigirasyon CORS ki byen fèt pou Netlify
app.use(cors({
  origin: ['https://rcglobal.netlify.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// 2. Wout (Routes) ki la deja yo
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const productRoutes = require("./routes/product");
app.use("/api/products", productRoutes);

// 👇 3. MWEN AJOUTE WOUT POU PEMAN AN POU OU 👇
// Asire w ou gen yon dosye 'payment.js' anndan katab 'routes' ou a
// Si w genyen l, retire "//" devan de liy kòd sa yo:
// const paymentRoutes = require("./routes/payment");
// app.use("/api/payment", paymentRoutes);


// CONNECT MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("Mongo error:", err));


// 4. PÒ POU SÈVÈ A LIMEN AN (Render ap chèche l pou l ka mache)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sèvè a ap mache byen sou pò ${PORT} 🚀`);
});