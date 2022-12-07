const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const eventsController = require("../controllers/events");
const photosController = require("../controllers/photos");
const videosController = require("../controllers/videos");
const recipesController = require("../controllers/recipes");
const wishlistsController = require("../controllers/wishlists");

const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

//New Pages
router.get("/calendar", ensureAuth, eventsController.getCalendar);
router.get("/videoFeed", ensureAuth, videosController.getVideoFeed);
router.get("/photoFeed", ensureAuth, photosController.getPhotoFeed);
router.get("/recipeFeed", ensureAuth, recipesController.getRecipeFeed);
router.get("/wishlistFeed", ensureAuth, wishlistsController.getWishlistFeed);

module.exports = router;