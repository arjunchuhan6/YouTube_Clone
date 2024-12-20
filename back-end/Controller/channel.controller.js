import channelModel from "../Model/channel.model.js";
import validator from "validator";

//Api for add channel
export function addChannel(req, res) {
    const { name, image, handle } = req.body;

    const newChannel = new channelModel({
        image,
        name,
        handle
    });

    newChannel.save().then(data => {
        if (!data) {
            return res.status(400).json({ message: "Channel not created" })
        }
        res.status(200).send(data)
    }).catch(err => res.status(500).json({ message: err.message }));
};

//Api for delete a channel
export function deleteChannel(req, res) {
    const _id = req.params.id;

    channelModel.findByIdAndDelete(_id).then(data => {
        if (!data) {
            return res.status(404).json({ message: "Channel not found" })
        }
        res.status(200).send(data)
    }).catch(err => res.status(500).json({ message: err.message }));
}

//Api for fetching channels
export function viewChannel(req, res) {
    channelModel.find().then(data => {
        if (!data) {
            return res.status(404).json({ message: "Channel not present" });
        }
        res.status(200).send(data)
    }).catch(err => res.status(500).json({ message: err.message }));
};


//Api for add a video in a channel
export function addVideo(req, res) {
    const _id = req.params.id;
    const { title, description, url, category, uploadDate, likes, dislikes, comments } = req.body;

    if (!title || !description || !url || !category || !uploadDate || likes == undefined || dislikes == undefined || comments == undefined) {
        return res.status(400).json({ message: "Provide all details" })
    }

    //validate the url
    if (!validator.isURL(url)) {
        return res.status(400).json({ message: "Invalid URL format" });
    }

    if (uploadDate < Date.now()) {
        return res.status(400).json({ message: "enter correct date" });
    }

    let update = {};

    update.$push = { video: { title, description, url, category, uploadDate, likes, dislikes, comments } }
    console.log(update);


    channelModel.findByIdAndUpdate(_id, update, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: "Video not found" });
            }
            res.status(200).json(data);
        })
        .catch(err => {
            console.error("Error updating video:", err);
            res.status(500).json({ message: "Server error" });
        });
}


//Api for edit video
export function editVideo(req, res) {
    const _id = req.params.id;
    const { title, description, url, category, index } = req.body;
    console.log("Request Body:", req.body);

    // Check if ID, index, and at least one field are provided
    if (!_id || !index || (!title && !description && !url && !category)) {
        return res.status(400).json({ message: "Provide all details" });
    }

    // Validate URL if provided
    if (url && !validator.isURL(url)) {
        return res.status(400).json({ message: "Invalid URL format" });
    }

    // Build update object
    let updateFields = {};
    if (title) updateFields["video.$[elem].title"] = title;
    if (description) updateFields["video.$[elem].description"] = description;
    if (url) updateFields["video.$[elem].url"] = url;
    if (category) updateFields["video.$[elem].category"] = category;

    console.log("Update Fields:", updateFields);

    channelModel.findByIdAndUpdate(
        _id,
        { $set: updateFields },
        {
            new: true,
            runValidators: true,
            arrayFilters: [{ "elem._id": index }]
        }
    )
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: "Video not found" });
            }
            console.log("Updated Data:", data);
            res.status(200).json(data);
        })
        .catch(err => {
            console.error("Error updating video:", err);
            res.status(500).json({ message: "Server error" });
        });
}


//Api for delete comment from database
export function deleteVideo(req, res) {
    const _id = req.params.id;
    const { index } = req.body;

    if (!_id || index === undefined) {
        return res.status(400).json({ message: "Provide video ID and comment index" });
    }

    channelModel.findById(_id)
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: "Video not found" });
            }

            // Ensure the index is valid
            if (index < 0 || index >= data.video.length) {
                return res.status(400).json({ message: "Invalid comment index" });
            }

            // Remove the comment at the specified index
            data.video.splice(index, 1);

            // Save the updated document
            data.save()
                .then(updatedData => res.status(200).json(updatedData))
                .catch(err => {
                    console.error("Error saving video:", err);
                    res.status(500).json({ message: "Server error" });
                });
        })
        .catch(err => {
            console.error("Error finding video:", err);
            res.status(500).json({ message: "Server error" });
        });
}