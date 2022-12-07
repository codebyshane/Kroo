const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deleted: { type: Boolean },
  edited: { type: Boolean }
}, {
  toObject: { virtuals: true }
});
EventSchema.virtual('comments', {
  ref: 'EventComment',
  localField: '_id',
  foreignField: 'event'
});
EventSchema.virtual('likes', {
  ref: 'EventLike',
  localField: '_id',
  foreignField: 'event',
  count: true
});


module.exports = mongoose.model("Event", EventSchema);