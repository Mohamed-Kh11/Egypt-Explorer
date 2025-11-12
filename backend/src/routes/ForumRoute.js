import express from "express";
import Forum from "../../models/Forum.js";

const router = express.Router();


// ✅ GET all forum posts
router.get("/", async (req, res) => {
  try {
    const posts = await Forum.find().sort({ date: -1 }); // latest first
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err.message });
  }
});


// ✅ CREATE a new forum post
router.post("/", async (req, res) => {
  try {
    const { user, email, content } = req.body;

    // Basic validation
    if (!user || !email || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newPost = new Forum({ user, email, content });
    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      post: newPost
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err.message });
  }
});


// ✅ GET a single post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Forum.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Error fetching post", error: err.message });
  }
});


// ✅ UPDATE a post by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Forum.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({
      message: "Post updated successfully",
      post: updatedPost
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating post", error: err.message });
  }
});


// ✅ DELETE a post by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Forum.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post", error: err.message });
  }
});


export default router;
