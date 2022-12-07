const express = require("express");
const router = express.Router();
const recipeCommentsController = require("../controllers/recipeComments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createComment/:recipeId/:commentId?", recipeCommentsController.createComment);
router.delete("/deleteComment/:recipeId/:commentId", recipeCommentsController.deleteComment);
router.patch("/editComment/:recipeId/:commentId", recipeCommentsController.editComment);

module.exports = router;