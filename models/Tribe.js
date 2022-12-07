const mongoose = require("mongoose");

const TribeSchema = new mongoose.Schema({
  name: {
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
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ally: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tribe"
}
});


module.exports = mongoose.model("Tribe", TribeSchema);