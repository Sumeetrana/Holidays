import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import "dotenv/config"

import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

app.listen(7000, () => {
    console.log(`Server is running on 7000`);
    
})