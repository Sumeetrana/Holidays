import express from 'express';
import cors from 'cors';
import "dotenv/config"

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