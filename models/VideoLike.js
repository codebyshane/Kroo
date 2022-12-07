const mongoose = require("mongoose");

const VideoLikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  },
});

module.exports = mongoose.model("VideoLike", VideoLikeSchema);