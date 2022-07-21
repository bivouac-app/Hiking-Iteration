const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

const commentController = {};

commentController.createComment = async (req, res, next) => {
  try {
    const { content, author_id, post_id } = req.body;
    const user = await User.findById(author_id);
    const post = await Post.findById(post_id);
    const comment = await Comment.create({ content, author_id: user, post });
    res.send(comment);
  } catch (err) {
    return next(err);
  }
};

commentController.deleteComment = (req, res, next) => {
  const { id } = req.params;
  Comment.findByIdAndDelete(id)
    .then(() => res.sendStatus(200))
    .catch((err) => {
      return next(err);
    });
};

commentController.getSpecificComment = (req, res, next) => {
  const { id } = req.params;
  Comment.findById(id)
    .then((comment) => res.send(comment))
    .catch((err) => {
      return next(err);
    });
};

module.exports = commentController;
