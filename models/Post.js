const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
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
PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
});
PostSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'post',
  count: true
});


module.exports = mongoose.model("Post", PostSchema);
