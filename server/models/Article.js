import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema({
    title: String,
    description: String,
    author: { type: String, default: "Pradnya Deva"},
    body: String,
    comments: [
        {
            username: String,
            body: String,
            date: { type: Date, default: Date.now }
        }
    ],
    date: { type: Date, default: Date.now },
    tags: String
});

const Article = mongoose.model('Article', blogSchema);
export default Article;
