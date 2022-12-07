const mongoose = require("mongoose");

const PhotoCommentSchema = new mongoose.Schema({
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
  photo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Photo",
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PhotoComment",
  },
  deleted: { type: Boolean },
  edited: { type: Boolean }
}, {
  toObject: { virtuals: true }
});
PhotoCommentSchema.virtual('comments', {
  ref: 'PhotoComment',
  localField: '_id',
  foreignField: 'comment',
  autopopulate: true
});

PhotoCommentSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("PhotoComment", PhotoCommentSchema);