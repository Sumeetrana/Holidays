import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

import "dotenv/config"

import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import hotelRoutes from "./routes/hotels";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express();

app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(cookieParser());

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/hotels", hotelRoutes)

app.listen(7000, () => {
    console.log(`Server is running on 7000`);
    
})