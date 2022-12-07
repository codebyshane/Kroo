const mongoose = require("mongoose");

const EventLikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
});

module.exports = mongoose.model("EventLike", EventLikeSchema);