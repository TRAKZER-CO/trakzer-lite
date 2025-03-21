const express = require("express");
const Post = require("../models/Post");
const verifyToken = require("../middlewares/auth");

const router = express.Router();

router.post("/create", verifyToken, async (req, res) => {
    try {
        const { content, image } = req.body;
        const newPost = new Post({ user: req.user.id, content, image });
        await newPost.save();
        res.status(201).json(newPost);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "username").sort({ createdAt: -1 });
        res.json(posts);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/:id/like", verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        post.likes.includes(req.user.id)
            ? (post.likes = post.likes.filter(id => id.toString() !== req.user.id))
            : post.likes.push(req.user.id);

        await post.save();
        res.json(post);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
