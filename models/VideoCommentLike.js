const mongoose = require("mongoose");

const VideoCommentLikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  videoComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VideoComment",
  },
});

module.exports = mongoose.model("VideoCommentLike", VideoCommentLikeSchema);