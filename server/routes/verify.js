import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/verify", async (req, res, next) => {
    // Extracting the token from the authorization header
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({
            success: false,
            message: "Error! Token was not provided."
        });
    }
    
    const token = authorizationHeader.split(' ')[1];
    
    try {
        // Verifying the token
        const decodedToken = jwt.verify(token, "anjay");
        // If verification is successful, respond with success
        res.status(200).json({
            success: true,
        });
        next();
    } catch (error) {
        // If verification fails, respond with an error
        res.status(401).json({
            success: false,
            message: "Error! Invalid token."
        });
    }
});

export default router;
