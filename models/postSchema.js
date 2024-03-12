import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  contents: {
    type: String,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("post", PostSchema);
export default Post;
