const WishlistComment = require("../models/WishlistComment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await WishlistComment.create({
        text: req.body.text,
        user: req.user.id,
				wishlist: req.params.commentId ? undefined : req.params.wishlistId,
        comment: req.params.commentId
      });
      console.log("Wishlist Comment has been added!");
      res.redirect("/wishlist/" + req.params.wishlistId);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const comment = await WishlistComment.findById(req.params.commentId).populate('comments');
      if (!comment.comments.length){
        await comment.remove()
        console.log("Wishlist Comment has been deleted!");
        return res.redirect("/wishlist/" + req.params.wishlistId);
      }
      comment.text = '';
      comment.deleted = true;
      await comment.save();
      console.log("Wishlist Comment has been cleared!");
      res.redirect("/wishlist/" + req.params.wishlistId);
    } catch (err) {
      console.log(err);
    }
  },
  editComment: async (req, res) => {
    try {
      const comment = await WishlistComment.findById(req.params.commentId);
      comment.text = req.body.text;
      comment.edited = true;
      await comment.save();
      console.log("Wishlist Comment has been edited!");
      res.redirect("/wishlist/" + req.params.wishlistId);
    }
    catch (err) {
      console.log(err);
    }
  }
};