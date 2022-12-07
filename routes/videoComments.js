const express = require("express");
const router = express.Router();
const videoCommentsController = require("../controllers/videoComments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createComment/:videoId/:commentId?", videoCommentsController.createComment);
router.delete("/deleteComment/:videoId/:commentId", videoCommentsController.deleteComment);
router.patch("/editComment/:videoId/:commentId", videoCommentsController.editComment);

module.exports = router;