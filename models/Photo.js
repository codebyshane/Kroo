const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema({
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
}, {
  toObject: { virtuals: true }
});
PhotoSchema.virtual('comments', {
  ref: 'PhotoComment',
  localField: '_id',
  foreignField: 'photo'
});
PhotoSchema.virtual('likes', {
  ref: 'PhotoLike',
  localField: '_id',
  foreignField: 'photo',
  count: true
});


module.exports = mongoose.model("Photo", PhotoSchema);