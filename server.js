require("dotenv").config({ path: __dirname + "/.env" });

console.log("MONGO_URI:", process.env.MONGO_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// 1. Konfigirasyon CORS ki byen fèt
app.use(cors({
  origin: [
    'https://rcglobal.netlify.app', 
    'http://localhost:3000',
    'https://rc-frontend-beryl.vercel.app' // 👈 NOUVO LYEN AN LA
  ],
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
// Wout peman yo debloke kounye a!
const paymentRoutes = require("./routes/payment");
app.use("/api/payment", paymentRoutes);


// CONNECT MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("Mongo error:", err));


// 4. Konfigirasyon espesyal pou Vercel (Li ranplase app.listen an)
module.exports = app;