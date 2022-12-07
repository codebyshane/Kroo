const mongoose = require("mongoose");

const PhotoLikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  photo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Photo",
  },
});

module.exports = mongoose.model("PhotoLike", PhotoLikeSchema);