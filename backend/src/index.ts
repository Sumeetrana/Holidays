import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import "dotenv/config"

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get("/api/test", async (req, res) => {
    res.json({message: 'Hello from express'})
})

app.listen(7000, () => {
    console.log(`Server is running on 7000`);
    
})