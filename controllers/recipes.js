const cloudinary = require("../middleware/cloudinary");
const Recipe = require("../models/Recipe");
const RecipeComment = require("../models/RecipeComment");
const RecipeLike = require("../models/RecipeLike");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const recipes = await Recipe.find({ user: req.user.id }).populate('likes');
      res.render("profile.ejs", { recipes: recipes, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getRecipeFeed: async (req, res) => {
    try {
      const recipes = await Recipe.find().sort({ createdAt: "desc" }).populate('likes').lean();
      res.render("recipeFeed.ejs", { recipes: recipes });
    } catch (err) {
      console.log(err);
    }
  },
  getRecipe: async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id).populate('likes').populate({
        path: 'comments',
        populate: { path: 'user' }
      });
      const comments = recipe.comments
      res.render("recipe.ejs", { recipe: recipe, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createRecipe: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Recipe.create({
        dish: req.body.dish,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        user: req.user.id,
      });
      console.log("Recipe has been added!");
      res.redirect("/recipeFeed");
    } catch (err) {
      console.log(err);
    }
  },
  likeRecipe: async (req, res) => {
    try {
      const obj = { user: req.user.id, recipe: req.params.id };
      if ((await RecipeLike.deleteOne(obj)).deletedCount) {
        console.log("Likes -1");
        return res.redirect(`/recipe/${req.params.id}`);
      }
      await RecipeLike.create(obj);
      console.log("Likes +1");
      res.redirect(`/recipe/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteRecipe: async (req, res) => {
    try {
      // Find post by id
      let recipe = await Recipe.findById({ _id: req.params.id }).populate('likes').populate('comments');
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(recipe.cloudinaryId);
      // Delete post from db
      const commentIDs = [];
      const comments = recipe.comments;
      while (comments.length) {
        const comment = comments.pop();
        comments.push(...comment.comments);
        commentIDs.push(comment.id);
      }
      await RecipeComment.deleteMany({ _id: { $in: commentIDs}});
      await RecipeLike.deleteMany({ recipe: req.params.id });
      await Recipe.remove({ _id: req.params.id });
      console.log("Deleted Recipe");
      res.redirect("/recipeFeed");
    } catch (err) {
      res.redirect("/recipeFeed");
    }
  },
  editRecipe: async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      recipe.title = req.body.title;
      recipe.edited = true;
      await recipe.save();
      console.log("Recipe has been edited!");
      res.redirect("/recipe/" + req.params.id);
    }
    catch (err) {
      console.log(err);
    }
  }
};