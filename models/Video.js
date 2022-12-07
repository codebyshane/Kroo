const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
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
}, {
  toObject: { virtuals: true }
});
VideoSchema.virtual('comments', {
  ref: 'VideoComment',
  localField: '_id',
  foreignField: 'video'
});
VideoSchema.virtual('likes', {
  ref: 'VideoLike',
  localField: '_id',
  foreignField: 'video',
  count: true
});


module.exports = mongoose.model("Video", VideoSchema);