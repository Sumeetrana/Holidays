import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from 'express-validator';

import User from "../models/user";

const router = express.Router()

router.post("/register", [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({
        min: 6
    }),
], async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()})
    }

    const { email } = req.body;
    try {
        let user = await User.findOne({
            email
        })

        if(user) {
            return res.status(400).json({message: 'User already exists'})
        }

        user = new User(req.body)

        await user.save()

        const token = jwt.sign(
            { userId: user.id }, 
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: "1d"
            })
        
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        })

        return res.status(200).json({message: "User registered successfully!"})
    } catch (error) {
        console.log(error);
        
        return res.status(500).send({message: "Something went wrong"})
    }
})

export default router