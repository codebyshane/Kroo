const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  // itemLink: {
  //   type: String,
  //   require: true
  // },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tribe: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Tribe",
    autopopulate: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deleted: { type: Boolean },
  edited: { type: Boolean }
}, {
  toObject: { virtuals: true }
});
WishlistSchema.virtual('comments', {
  ref: 'WishlistComment',
  localField: '_id',
  foreignField: 'wishlist'
});
WishlistSchema.virtual('likes', {
  ref: 'WishlistLike',
  localField: '_id',
  foreignField: 'wishlist',
  count: true
});


module.exports = mongoose.model("Wishlist", WishlistSchema);