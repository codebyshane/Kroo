const mongoose = require("mongoose");

const EventCommentSchema = new mongoose.Schema({
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
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Photo",
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventComment",
  },
  deleted: { type: Boolean },
  edited: { type: Boolean }
}, {
  toObject: { virtuals: true }
});
EventCommentSchema.virtual('comments', {
  ref: 'EventComment',
  localField: '_id',
  foreignField: 'comment',
  autopopulate: true
});

EventCommentSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("EventComment", EventCommentSchema);