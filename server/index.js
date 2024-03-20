import express from 'express';
import cors from 'cors';
import Connect from './connect.js';
import postblog from "./routes/postblog.js";
import getarticle from "./routes/getblog.js";
import blogdetail from "./routes/blogdetail.js";
import postcomment from "./routes/postcomment.js";
import register from "./routes/register.js";
import login from "./routes/login.js";
import verify from "./routes/verify.js"

const app = express();


app.use(cors());
app.use(express.json())
app.get("/", (req, res, next) => {
    res.status(201).json({message: "its in"});
});
app.use("/", postblog);
app.use("/", getarticle);
app.use("/", blogdetail);
app.use("/", postcomment);
//app.use("/", register);
app.use("/", login);
app.use("/", verify);



export default app;