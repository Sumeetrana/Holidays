import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { HotelType } from "../models/hotel";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //5MB
    }
})

router.post("/", upload.array("imageFiles", 6), async(req: Request, res: Response) => {
    const imageFiles = req.files as Express.Multer.File[]
    const newHotel: HotelType = req.body;
    
    try {
        // 1. Upload the images to cloudinary
        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        })

        const imageUrls = await Promise.all(uploadPromises);

        // 2. If upload was successful, add the URLs to the new hotel
        
        // 3. Save the new hotel in our database
        // 4. Return a 201 status
    } catch (error) {
        console.log("Error creating hotel: ", error);
        return res.status(500).json({message: "Something went wrong!"})
    }
    
})

export default router;