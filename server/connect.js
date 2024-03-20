import dotenv from 'dotenv';
import * as mongoose from 'mongoose';

dotenv.config();
const db_connect = mongoose;

function Connect() {
    try {
        db_connect.connect(process.env.DB);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default Connect;