const mongoose = require("mongoose");

const WishlistLikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  wishlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wishlist",
  },
});

module.exports = mongoose.model("WishlistLike", WishlistLikeSchema);