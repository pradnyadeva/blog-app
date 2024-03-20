import express from 'express';
import Article from '../models/Article.js';

const router = express.Router();

router.post("/postcomment", async (req, res, next) => {
    try {
        const { id, username, body } = req.body;
        console.log(id);
        await Article.updateOne(
            { _id: id },
            {
                $set: { comments: { username: username, body: body } }
            }
        );
        console.log("ADDED")
        res.status(201).json({ message: "Comment added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;