import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/login", async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({"username": username});
        if (!user)
        {
            res.status(401).json({"message": "user not found"});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ username: username }, "anjay", {
            expiresIn: '1h',
            });
            res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
