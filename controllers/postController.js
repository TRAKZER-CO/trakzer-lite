const Post = require("../models/Post");

exports.createPost = async (req, res) => {
    try {
        const post = new Post({ userId: req.user.id, content: req.body.content, image: req.body.image });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("userId", "username profilePic").sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
