const mongoose = require("mongoose");

const CommentLikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
});

module.exports = mongoose.model("CommentLike", CommentLikeSchema);