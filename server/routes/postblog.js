import express from 'express';
import Article from '../models/Article.js';


const router = express.Router();

function verifyToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({
            success: false,
            message: "Error! Token was not provided."
        });
    }
    
    const token = authorizationHeader.split(' ')[1];
    
    try {
        const decodedToken = jwt.verify(token, "anjay");
        req.user = decodedToken; 
        next(); 
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Error! Invalid token."
        });
    }
}

router.post("/postblog", verifyToken, async (req, res, next) => {
    try {
        const { title, body, tags } = req.body;
        await Article.create({ title, description, body, tags });
        res.status(201).json({ message: "article created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
