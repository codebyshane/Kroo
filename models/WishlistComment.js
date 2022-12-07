const mongoose = require("mongoose");

const WishlistCommentSchema = new mongoose.Schema({
  text: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    autopopulate: true
  },
  tribe: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Tribe",
    autopopulate: true,
  },
  wishlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wishlist",
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WishlistComment",
  },
  deleted: { type: Boolean },
  edited: { type: Boolean }
}, {
  toObject: { virtuals: true }
});
WishlistCommentSchema.virtual('comments', {
  ref: 'WishlistComment',
  localField: '_id',
  foreignField: 'comment',
  autopopulate: true
});

WishlistCommentSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("WishlistComment", WishlistCommentSchema);