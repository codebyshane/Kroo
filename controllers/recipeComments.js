const RecipeComment = require("../models/RecipeComment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await RecipeComment.create({
        text: req.body.text,
        user: req.user.id,
				recipe: req.params.commentId ? undefined : req.params.recipeId,
        comment: req.params.commentId
      });
      console.log("Recipe Comment has been added!");
      res.redirect("/recipe/" + req.params.recipeId);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const comment = await RecipeComment.findById(req.params.commentId).populate('comments');
      if (!comment.comments.length){
        await comment.remove()
        console.log("Recipe Comment has been deleted!");
        return res.redirect("/recipe/" + req.params.recipeId);
      }
      comment.text = '';
      comment.deleted = true;
      await comment.save();
      console.log(" Recipe Comment has been cleared!");
      res.redirect("/recipe/" + req.params.recipeId);
    } catch (err) {
      console.log(err);
    }
  },
  editComment: async (req, res) => {
    try {
      const comment = await RecipeComment.findById(req.params.commentId);
      comment.text = req.body.text;
      comment.edited = true;
      await comment.save();
      console.log("Recipe Comment has been edited!");
      res.redirect("/recipe/" + req.params.recipeId);
    }
    catch (err) {
      console.log(err);
    }
  }
};