import VideoModel from "../Model/video.model.js";

export function fetchVideo(req, res) {
    VideoModel.find().then(data => {
        if(!data) {
            return res.status(404).json({message: "Videos are not present"});
        }
        res.status(200).send(data);
    }).catch(err => res.status(500).json({message: err.message}))
}

export function fetchOneVideo(req, res) {

    const _id = req.params.id

    VideoModel.findById(_id).then(data => {
        if(!data) {
            return res.status(404).json({message: "Video are not present"});
        }
        res.status(200).send(data);
    }).catch(err => res.status(500).json({message: err.message}))
}

export function AddVideo(req, res) {
    const { title, description, url, category, uploadDate, views, likes, dislikes,comments } = req.body;

    if (!title || !description || !url || !category || !uploadDate || views == undefined || likes == undefined || dislikes == undefined || comments == undefined) {
        return res.status(400).json({message: "Fill All details"})
    }

    const newItem = new VideoModel({ 
        title: title, 
        description: description, 
        url: url, 
        category: category, 
        uploadDate: uploadDate, 
        views: views, 
        likes: likes, 
        dislikes: dislikes,
        comments: comments
    });

    newItem.save().then(data => {
        if(!data) {
            return res.status(404).json({message: "data not save"})
        }
        res.status(200).send(data);
    }).catch(err => res.status(500).json({message: err.message}))
};

export function UpdateLikesDislikeComment(req, res) {
    const _id = req.params.id;
    const { likes, dislikes, comment, firstName } = req.body;

    if (!_id || (!likes && !dislikes && (!comment || !firstName))) {
        return res.status(400).json({ message: "Send required data" });
    }

    // Build the update object dynamically to avoid overwriting with undefined
    let update = {};
    if (likes !== undefined) update.likes = likes;
    if (dislikes !== undefined) update.dislikes = dislikes;

    // If comments are provided, append the new comment
    if (comment) {
        update.$push = { comments: { comment, firstName } };
    }

    // Update the video document
    VideoModel.findByIdAndUpdate(_id, update, { new: true })
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
};

//Api for edit comment in a database
export function editComment(req, res) {
    const _id = req.params.id;
    console.log(_id);

    const { comment, index } = req.body;
    console.log(comment, index);

    if (!_id || !comment || index == undefined) {
        return res.status(400).json({ message: "Provide all details" })
    }

    const update = { [`comments.${index}.comment`]: comment };

    VideoModel.findByIdAndUpdate(_id, { $set: update }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: "Video not found" });
            }
            res.status(200).json(data);
        })
        .catch(err => {
            console.error("Error updating comment:", err);
            res.status(500).json({ message: "Server error" });
        });
};

//Api for delete comment from database
export function deleteComment(req, res) {
    const _id = req.params.id;
    const { index } = req.body;

    if (!_id || index === undefined) {
        return res.status(400).json({ message: "Provide video ID and comment index" });
    }

    VideoModel.findById(_id)
        .then(video => {
            if (!video) {
                return res.status(404).json({ message: "Video not found" });
            }

            // Ensure the index is valid
            if (index < 0 || index >= video.comments.length) {
                return res.status(400).json({ message: "Invalid comment index" });
            }

            // Remove the comment at the specified index
            video.comments.splice(index, 1);

            // Save the updated document
            video.save()
                .then(updatedVideo => res.status(200).json(updatedVideo))
                .catch(err => {
                    console.error("Error saving video:", err);
                    res.status(500).json({ message: "Server error" });
                });
        })
        .catch(err => {
            console.error("Error finding video:", err);
            res.status(500).json({ message: "Server error" });
        });
};