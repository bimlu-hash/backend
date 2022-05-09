import express from "express";
import { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db";

import roomRoutes from "./routes/roomRoutes";
import userRoutes from "./routes/userRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import uploadRoutes from "./routes/uploadRoutes";

const app: Application = express();

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Default
app.get("/api", (req: Request, res: Response) => {
  res.status(201).json({ message: "Welcome to Hotel Booking App" });
});

// Room Route
app.use("/api/rooms", roomRoutes);

// User Route
app.use("/api/users", userRoutes);

// Booking Route
app.use("/api/bookings", bookingRoutes);

// Upload Route
app.use("/api/uploads", uploadRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Express is listening at http://localhost:${process.env.PORT}`);
});
