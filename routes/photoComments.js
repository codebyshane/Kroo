const express = require("express");
const router = express.Router();
const photoCommentsController = require("../controllers/photoComments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createComment/:photoId/:commentId?", photoCommentsController.createComment);
router.delete("/deleteComment/:photoId/:commentId", photoCommentsController.deleteComment);
router.patch("/editComment/:photoId/:commentId", photoCommentsController.editComment);

module.exports = router;