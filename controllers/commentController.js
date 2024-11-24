import { getIO } from '../config/socket.js';

export const createComment = async (req, res) => {
  try {
    const { text, postId } = req.body;
    const comment = new Comment({
      text,
      post: postId,
      user: req.user._id,
    });
    await comment.save();

    // Notify all connected clients about the new comment
    getIO().emit('newComment', { comment });

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
