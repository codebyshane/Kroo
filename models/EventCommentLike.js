const mongoose = require("mongoose");

const EventCommentLikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  eventComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventComment",
  },
});

module.exports = mongoose.model("EventCommentLike", EventCommentLikeSchema);