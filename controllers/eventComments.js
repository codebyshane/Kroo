const EventComment = require("../models/EventComment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await EventComment.create({
        text: req.body.text,
        user: req.user.id,
				event: req.params.commentId ? undefined : req.params.eventId,
        comment: req.params.commentId
      });
      console.log("Event Comment has been added!");
      res.redirect("/event/" + req.params.eventId);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const comment = await EventComment.findById(req.params.commentId).populate('comments');
      if (!comment.comments.length){
        await comment.remove()
        console.log("Event Comment has been deleted!");
        return res.redirect("/event/" + req.params.eventId);
      }
      comment.text = '';
      comment.deleted = true;
      await comment.save();
      console.log("Event Comment has been cleared!");
      res.redirect("/event/" + req.params.eventId);
    } catch (err) {
      console.log(err);
    }
  },
  editComment: async (req, res) => {
    try {
      const comment = await EventComment.findById(req.params.commentId);
      comment.text = req.body.text;
      comment.edited = true;
      await comment.save();
      console.log("Event Comment has been edited!");
      res.redirect("/event/" + req.params.eventId);
    }
    catch (err) {
      console.log(err);
    }
  }
};