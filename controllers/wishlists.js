const cloudinary = require("../middleware/cloudinary");
const Wishlist = require("../models/Wishlist");
const WishlistComment = require("../models/WishlistComment");
const WishlistLike = require("../models/WishlistLike");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const wishlists = await Wishlist.find({ user: req.user.id }).populate('likes');
      res.render("profile.ejs", { wishlists: wishlists, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getWishlistFeed: async (req, res) => {
    try {
      const wishlists = await Wishlist.find().sort({ createdAt: "desc" }).populate('likes').lean();
      res.render("wishlistFeed.ejs", { wishlists: wishlists });
    } catch (err) {
      console.log(err);
    }
  },
  getWishlist: async (req, res) => {
    try {
      const wishlist = await Wishlist.findById(req.params.id).populate('likes').populate({
        path: 'comments',
        populate: { path: 'user' }
      });
      const comments = wishlist.comments
      res.render("wishlist.ejs", { wishlist: wishlist, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createWishlist: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Wishlist.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        user: req.user.id,
      });
      console.log("Wishlist has been added!");
      res.redirect("/wishlistFeed");
    } catch (err) {
      console.log(err);
    }
  },
  likeWishlist: async (req, res) => {
    try {
      const obj = { user: req.user.id, wishlist: req.params.id };
      if ((await WishlistLike.deleteOne(obj)).deletedCount) {
        console.log("Likes -1");
        return res.redirect(`/wishlist/${req.params.id}`);
      }
      await WishlistLike.create(obj);
      console.log("Likes +1");
      res.redirect(`/wishlist/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteWishlist: async (req, res) => {
    try {
      // Find post by id
      let wishlist = await Wishlist.findById({ _id: req.params.id }).populate('likes').populate('comments');
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(wishlist.cloudinaryId);
      // Delete post from db
      const commentIDs = [];
      const comments = wishlist.comments;
      while (comments.length) {
        const comment = comments.pop();
        comments.push(...comment.comments);
        commentIDs.push(comment.id);
      }
      await WishlistComment.deleteMany({ _id: { $in: commentIDs}});
      await WishlistLike.deleteMany({ wishlist: req.params.id });
      await Wishlist.remove({ _id: req.params.id });
      console.log("Deleted Wishlist");
      res.redirect("/wishlistFeed");
    } catch (err) {
      res.redirect("/wishlistFeed");
    }
  },
  editWishlist: async (req, res) => {
    try {
      const wishlist = await Wishlist.findById(req.params.id);
      wishlist.title = req.body.title;
      wishlist.edited = true;
      await wishlist.save();
      console.log("Wishlist has been edited!");
      res.redirect("/wishlist/" + req.params.id);
    }
    catch (err) {
      console.log(err);
    }
  }
};