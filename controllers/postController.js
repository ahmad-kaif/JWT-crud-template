const Post = require("../models/Post.js");

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({ title, content, userId: req.user.id });

    await post.save();
    res.json({ message: "Post created", post });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

const updatePost = async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.findById(req.params.id);

  if (!post || post.userId.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  post.title = title;
  post.content = content;
  await post.save();

  res.json({ message: "Post updated", post });
};

const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post || post.userId.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await post.deleteOne();
  res.json({ message: "Post deleted" });
};

module.exports = { createPost, getAllPosts, updatePost, deletePost };
