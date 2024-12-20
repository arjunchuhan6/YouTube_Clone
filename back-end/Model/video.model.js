import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    uploadDate: {
        type: String,
        required: true
    },
    views: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    dislikes: {
        type: Number,
        required: true
    },
    comments: [{
        firstName: String,
        comment: String
    }],
});

const VideoModel = mongoose.model("VideoModel", VideoSchema);

export default VideoModel;