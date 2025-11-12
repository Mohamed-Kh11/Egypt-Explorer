// server.js (or index.js)
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";

// Import routes
import userRoutes from "./routes/UserRoute.js";
import flightRoutes from "./routes/FlightRoute.js";
import hotelRoutes from "./routes/HotelsRoute.js";
import productRoutes from "./routes/ProductRoute.js";
import forumRoutes from "./routes/ForumRoute.js";

const app = express();

// -------------------------
// MIDDLEWARE
// -------------------------
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// -------------------------
// ROUTES
// -------------------------
app.get("/", (req, res) => {
  res.status(200).json({ message: "✅ API is running on Vercel" });
});

app.use("/api/users", userRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/products", productRoutes);
app.use("/api/forum", forumRoutes);

// -------------------------
// GLOBAL ERROR HANDLER
// -------------------------
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ message: "Server error", error: err.message });
});

// -------------------------
// DB CONNECTION WRAPPER
// -------------------------
let isConnected = false;

async function ensureDB() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

// -------------------------
// EXPORT HANDLER (Vercel-style)
// -------------------------
export default async function handler(req, res) {
  await ensureDB();
  return app(req, res);
}
