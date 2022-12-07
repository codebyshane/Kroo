const mongoose = require("mongoose");

const RecipeCommentLikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  recipeComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RecipeComment",
  },
});

module.exports = mongoose.model("RecipeCommentLike", RecipeCommentLikeSchema);