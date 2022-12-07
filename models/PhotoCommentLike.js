const mongoose = require("mongoose");

const PhotoCommentLikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  photoComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PhotoComment",
  },
});

module.exports = mongoose.model("PhotoCommentLike", PhotoCommentLikeSchema);