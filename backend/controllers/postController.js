const Post = require("../models/Post");

const createPost = async (req, res) =>{
    try {
        const post = await new Post(req.body).save()
        res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports = createPost