const cloudinary = require("../middleware/cloudinary");
const Photo = require("../models/Photo");
const PhotoComment = require("../models/PhotoComment");
const PhotoLike = require("../models/PhotoLike");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const photos = await Photo.find({ user: req.user.id }).populate('likes');
      res.render("profile.ejs", { photos: photos, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getPhotoFeed: async (req, res) => {
    try {
      const photos = await Photo.find().sort({ createdAt: "desc" }).populate('likes').lean();
      res.render("photoFeed.ejs", { photos: photos });
    } catch (err) {
      console.log(err);
    }
  },
  getPhoto: async (req, res) => {
    try {
      const photo = await Photo.findById(req.params.id).populate('likes').populate({
        path: 'comments',
        populate: { path: 'user' }
      });
      const comments = photo.comments
      res.render("photo.ejs", { photo: photo, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createPhoto: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Photo.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        user: req.user.id,
      });
      console.log("Photo has been added!");
      res.redirect("/photoFeed");
    } catch (err) {
      console.log(err);
    }
  },
  likePhoto: async (req, res) => {
    try {
      const obj = { user: req.user.id, photo: req.params.id };
      if ((await PhotoLike.deleteOne(obj)).deletedCount) {
        console.log("Likes -1");
        return res.redirect(`/photo/${req.params.id}`);
      }
      await PhotoLike.create(obj);
      console.log("Likes +1");
      res.redirect(`/photo/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePhoto: async (req, res) => {
    try {
      // Find post by id
      let photo = await Photo.findById({ _id: req.params.id }).populate('likes').populate('comments');
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(photo.cloudinaryId);
      // Delete post from db
      const commentIDs = [];
      const comments = photo.comments;
      while (comments.length) {
        const comment = comments.pop();
        comments.push(...comment.comments);
        commentIDs.push(comment.id);
      }
      await PhotoComment.deleteMany({ _id: { $in: commentIDs}});
      await PhotoLike.deleteMany({ photo: req.params.id });
      await Photo.remove({ _id: req.params.id });
      console.log("Deleted Photo");
      res.redirect("/photoFeed");
    } catch (err) {
      res.redirect("/photoFeed");
    }
  },
};