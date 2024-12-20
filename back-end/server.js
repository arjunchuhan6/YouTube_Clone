import mongoose from "mongoose"
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {VideoRoutes} from "./Routes/video.routes.js";
import { userRoutes } from "./Routes/user.routes.js";
import { channelRoutes } from "./Routes/channel.routes.js";

const app = express();
dotenv.config()
app.use(express.json());

app.use(cors());
app.listen(5000, () => {
    console.log("running on port 5000")
})

mongoose.connect(process.env.MONGODB_URL, {
})
    .then(() => {
        console.log("Connection is successful");
    })
    .catch((err) => {
        console.log("Connection has failed", err);
    });

//routes
VideoRoutes(app);
userRoutes(app);
channelRoutes(app);