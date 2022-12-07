const cloudinary = require("../middleware/cloudinary");
const Event = require("../models/Event");
const EventComment = require("../models/EventComment");
const EventLike = require("../models/EventLike");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const events = await Event.find({ user: req.user.id }).populate('likes');
      res.render("profile.ejs", { events: events, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getCalendar: async (req, res) => {
    try {
      const events = await Event.find().sort({ createdAt: "desc" }).populate('likes').lean();
      res.render("calendar.ejs", { events: events });
    } catch (err) {
      console.log(err);
    }
  },
  getEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id).populate('likes').populate({
        path: 'comments',
        populate: { path: 'user' }
      });
      const comments = event.comments
      res.render("event.ejs", { event: event, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createEvent: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Event.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        user: req.user.id,
      });
      console.log("Event has been added!");
      res.redirect("/calendar");
    } catch (err) {
      console.log(err);
    }
  },
  likeEvent: async (req, res) => {
    try {
      const obj = { user: req.user.id, event: req.params.id };
      if ((await EventLike.deleteOne(obj)).deletedCount) {
        console.log("Likes -1");
        return res.redirect(`/event/${req.params.id}`);
      }
      await EventLike.create(obj);
      console.log("Likes +1");
      res.redirect(`/event/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteEvent: async (req, res) => {
    try {
      // Find event by id
      let event = await Event.findById({ _id: req.params.id }).populate('likes').populate('comments');
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      const commentIDs = [];
      const comments = event.comments;
      while (comments.length) {
        const comment = comments.pop();
        comments.push(...comment.comments);
        commentIDs.push(comment.id);
      }
      await EventComment.deleteMany({ _id: { $in: commentIDs}});
      await EventLike.deleteMany({ event: req.params.id });
      await Event.remove({ _id: req.params.id });
      console.log("Deleted Event");
      res.redirect("/calendar");
    } catch (err) {
      res.redirect("/calendar");
    }
  },
  editEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      event.title = req.body.title;
      event.edited = true;
      await event.save();
      console.log("Event has been edited!");
      res.redirect("/event/" + req.params.id);
    }
    catch (err) {
      console.log(err);
    }
  }
};