const Comment = require("../models/comment");

exports.comment_get = async (req, res) => {
  try {
    const comment = await (await Comment.findById(req.params.id))
      .populate("blog")
      .populate("author");
    res.json(comment);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

exports.comment_update = async (req, res) => {
  try {
    const owner = await Comment.find({
      _id: req.params.id,
      author: req.user._id,
    });
    if (owner.length > 0) {
      const comment = {
        _id: req.params.id,
        blog: owner[0].blog,
        author: req.user._id,
        title: req.body.title,
        content: req.body.content,
      };
      await Comment.findByIdAndUpdate(req.params.id, comment, {});
      res.json(comment);
    } else {
      res.json({ error: "You can't edit someone else's comment" });
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

exports.comment_delete = async (req, res) => {
  try {
    const owner = await Comment.find({
      _id: req.params.id,
      author: req.user._id,
    });
    if (owner.length > 0) {
      await Comment.findByIdAndRemove(req.params.id);
      res.json({ message: "Comment successfully deleted" });
    } else {
      res.json({ error: "You can't delete someone else's comment" });
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
} ;