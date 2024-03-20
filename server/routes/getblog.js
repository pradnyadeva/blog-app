import express from 'express';
import Article from '../models/Article.js';


const router = express.Router();

router.get("/getblog", async (req, res, next) => {
    try {
        const get_article = await Article.find({});
        res.status(201).json(get_article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
