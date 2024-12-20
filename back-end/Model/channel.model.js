import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    image: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    handle: {
        type: String,
        required: true
    },
    video: [{
        title: String,
        description: String,
        url: String,
        category: String,
        uploadDate: String,
        likes: Number,
        dislikes: Number,
        comments: []
    }]
});

const channelModel = mongoose.model("channel", channelSchema);

export default channelModel;