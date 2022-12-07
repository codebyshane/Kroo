const mongoose = require("mongoose");

const WishlistCommentLikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  wishlistComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WishlistComment",
  },
});

module.exports = mongoose.model("WishlistCommentLike", WishlistCommentLikeSchema);