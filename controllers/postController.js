import asyncHandler from "express-async-handler";
import Post from "../models/postSchema.js";
import User from "../models/userSchema.js";

const createPost = asyncHandler(async (req, res, next) => {
  const { title, content, author } = req.body;

  try {
    const userId = await User.findOne(req.params.id);
    const posts = await Post.create({ title, content, author });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export { createPost };
