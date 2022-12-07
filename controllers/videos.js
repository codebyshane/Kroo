const cloudinary = require("../middleware/cloudinary");
const Video = require("../models/Video");
const VideoComment = require("../models/VideoComment");
const VideoLike = require("../models/VideoLike");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const videos = await Video.find({ user: req.user.id }).populate('likes');
      res.render("profile.ejs", { videos: videos, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getVideoFeed: async (req, res) => {
    try {
      const videos = await Video.find().sort({ createdAt: "desc" }).populate('likes').lean();
      res.render("videoFeed.ejs", { videos: videos });
    } catch (err) {
      console.log(err);
    }
  },
  getVideo: async (req, res) => {
    try {
      const video = await Video.findById(req.params.id).populate('likes').populate({
        path: 'comments',
        populate: { path: 'user' }
      });
      const comments = video.comments
      res.render("video.ejs", { video: video, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createVideo: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Video.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        user: req.user.id,
      });
      console.log("Video has been added!");
      res.redirect("/videoFeed");
    } catch (err) {
      console.log(err);
    }
  },
  likeVideo: async (req, res) => {
    try {
      const obj = { user: req.user.id, video: req.params.id };
      if ((await VideoLike.deleteOne(obj)).deletedCount) {
        console.log("Likes -1");
        return res.redirect(`/video/${req.params.id}`);
      }
      await VideoLike.create(obj);
      console.log("Likes +1");
      res.redirect(`/video/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteVideo: async (req, res) => {
    try {
      // Find post by id
      let video = await Video.findById({ _id: req.params.id }).populate('likes').populate('comments');
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(video.cloudinaryId);
      // Delete post from db
      const commentIDs = [];
      const comments = video.comments;
      while (comments.length) {
        const comment = comments.pop();
        comments.push(...comment.comments);
        commentIDs.push(comment.id);
      }
      await VideoComment.deleteMany({ _id: { $in: commentIDs}});
      await VideoLike.deleteMany({ video: req.params.id });
      await Video.remove({ _id: req.params.id });
      console.log("Deleted Video");
      res.redirect("/videoFeed");
    } catch (err) {
      res.redirect("/videoFeed");
    }
  },
};