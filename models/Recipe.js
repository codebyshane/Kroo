const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  ingredientName: {
    type: String,
    require: true,
  },
  ingredientUnit: {
    type: String,
    require: true
  },
  ingredientAmount: {
    type: Number,
    require: true
  },
  // instructionStep: {
  //   type: String,
  //   require: true,
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tribe: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Tribe",
    autopopulate: true,
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
RecipeSchema.virtual('comments', {
  ref: 'RecipeComment',
  localField: '_id',
  foreignField: 'recipe'
});
RecipeSchema.virtual('likes', {
  ref: 'RecipeLike',
  localField: '_id',
  foreignField: 'recipe',
  count: true
});


module.exports = mongoose.model("Recipe", RecipeSchema);