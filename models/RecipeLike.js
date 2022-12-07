const mongoose = require("mongoose");

const RecipeLikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
  },
});

module.exports = mongoose.model("RecipeLike", RecipeLikeSchema);