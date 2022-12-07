const PhotoComment = require("../models/PhotoComment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await PhotoComment.create({
        text: req.body.text,
        user: req.user.id,
				photo: req.params.commentId ? undefined : req.params.photoId,
        comment: req.params.commentId
      });
      console.log("Photo Comment has been added!");
      res.redirect("/photo/" + req.params.photoId);
    } catch (err) {
      console.log(err);
    }
  }, 
  deleteComment: async (req, res) => {
    try {
      const comment = await PhotoComment.findById(req.params.commentId).populate('comments');
      if (!comment.comments.length){
        await comment.remove()
        console.log("Photo Comment has been deleted!");
        return res.redirect("/photo/" + req.params.photoId);
      }
      comment.text = '';
      comment.deleted = true;
      await comment.save();
      console.log("Comment has been cleared!");
      res.redirect("/photo/" + req.params.photoId);
    } catch (err) {
      console.log(err);
    }
  },
  editComment: async (req, res) => {
    try {
      const comment = await PhotoComment.findById(req.params.commentId);
      comment.text = req.body.text;
      comment.edited = true;
      await comment.save();
      console.log("Photo Comment has been edited!");
      res.redirect("/photo/" + req.params.photoId);
    }
    catch (err) {
      console.log(err);
    }
  }
};