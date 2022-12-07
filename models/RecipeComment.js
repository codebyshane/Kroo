const mongoose = require("mongoose");

const RecipeCommentSchema = new mongoose.Schema({
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
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RecipeComment",
  },
  deleted: { type: Boolean },
  edited: { type: Boolean }
}, {
  toObject: { virtuals: true }
});
RecipeCommentSchema.virtual('comments', {
  ref: 'RecipeComment',
  localField: '_id',
  foreignField: 'comment',
  autopopulate: true
});

RecipeCommentSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("RecipeComment", RecipeCommentSchema);