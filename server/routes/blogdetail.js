import express from 'express';
import Article from '../models/Article.js';

const router = express.Router();

router.get("/blogdetail/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const get_article = await Article.findOne({'_id':id});
        res.status(201).json(get_article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
