const express = require("express");
const router = express.Router();
const eventCommentsController = require("../controllers/eventComments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createComment/:eventId/:commentId?", eventCommentsController.createComment);
router.delete("/deleteComment/:eventId/:commentId", eventCommentsController.deleteComment);
router.patch("/editComment/:eventId/:commentId", eventCommentsController.editComment);

module.exports = router;