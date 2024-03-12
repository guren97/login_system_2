import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: () => Date.now(), // Use a function to set the default value dynamically
  },
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
