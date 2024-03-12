// controllers/post.js
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Post from "../models/postSchema.js";
import User from "../models/userSchema.js";

const createUserPost = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(401).json({ success: false, message: "Invalid user id" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // Check if a post with the same title already exists
    const existingPost = await Post.findOne({ title });
    if (existingPost) {
      return res.status(400).json({
        success: false,
        message: "Post with this title already exists",
      });
    }

    const post = await Post.create({ title, content, author: user.id });
    // const post = new Post({ title, content, author: user._id }); // Use new Post()
    // await post.save();
    user.posts.push(post._id); // Push post._id instead of post
    await user.save(); // Save the user

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export { createUserPost };
