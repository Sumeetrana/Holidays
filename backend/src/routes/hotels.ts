import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";

import Hotel, { HotelType } from "../models/hotel";
import { verifyToken } from "../middleware/auth";
import { body, validationResult } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //5MB
    }
})

router.post("/", verifyToken, [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage('City is required'),
    body("country").notEmpty().withMessage('Country is required'),
    body("description").notEmpty().withMessage('Description is required'),
    body("type").notEmpty().withMessage('Type is required'),
    body("pricePerNight").notEmpty().withMessage('PricePerNight is required and must be a number'),
    body("facilities").notEmpty().isArray().withMessage('Facilities are required'),
],upload.array("imageFiles", 6), async(req: Request, res: Response) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()})
    }
    
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
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        // 3. Save the new hotel in our database
        const hotel = new Hotel(newHotel);
        await hotel.save()

        // 4. Return a 201 status
        return res.status(201).send(hotel);
    } catch (error) {
        console.log("Error creating hotel: ", error);
        return res.status(500).json({message: "Something went wrong!"})
    }
     
})

export default router;