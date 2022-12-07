const express = require("express");
const router = express.Router();
const wishlistCommentsController = require("../controllers/wishlistComments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createComment/:wishlistId/:commentId?", wishlistCommentsController.createComment);
router.delete("/deleteComment/:wishlistId/:commentId", wishlistCommentsController.deleteComment);
router.patch("/editComment/:wishlistId/:commentId", wishlistCommentsController.editComment);

module.exports = router;