const mongoose = require("mongoose");

const VideoCommentSchema = new mongoose.Schema({
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
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VideoComment",
  },
  deleted: { type: Boolean },
  edited: { type: Boolean }
}, {
  toObject: { virtuals: true }
});
VideoCommentSchema.virtual('comments', {
  ref: 'VideoComment',
  localField: '_id',
  foreignField: 'comment',
  autopopulate: true
});

VideoCommentSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("VideoComment", VideoCommentSchema);