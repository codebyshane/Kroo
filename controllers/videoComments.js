const VideoComment = require("../models/VideoComment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await VideoComment.create({
        text: req.body.text,
        user: req.user.id,
				video: req.params.commentId ? undefined : req.params.videoId,
        comment: req.params.commentId
      });
      console.log("Video Comment has been added!");
      res.redirect("/video/" + req.params.videoId);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const comment = await VideoComment.findById(req.params.commentId).populate('comments');
      if (!comment.comments.length){
        await comment.remove()
        console.log("Video Comment has been deleted!");
        return res.redirect("/video/" + req.params.videoId);
      }
      comment.text = '';
      comment.deleted = true;
      await comment.save();
      console.log("Video Comment has been cleared!");
      res.redirect("/video/" + req.params.videoId);
    } catch (err) {
      console.log(err);
    }
  },
  editComment: async (req, res) => {
    try {
      const comment = await VideoComment.findById(req.params.commentId);
      comment.text = req.body.text;
      comment.edited = true;
      await comment.save();
      console.log("Video Comment has been edited!");
      res.redirect("/video/" + req.params.videoId);
    }
    catch (err) {
      console.log(err);
    }
  }
};