import { getIO } from '../config/socket.js';  // Correctly import getIO
import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    const { text, mediaUrl } = req.body;
    const post = new Post({
      text,
      mediaUrl,
      user: req.user._id,
    });
    await post.save();

    // Notify all connected clients about new post
    getIO().emit('newPost', { post });  // Use getIO() to get the socket instance

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'name');

    const total = await Post.countDocuments();

    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
