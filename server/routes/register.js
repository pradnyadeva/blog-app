import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';



const router = express.Router();

router.post("/register", async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({username, password: hashedPassword});
        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
