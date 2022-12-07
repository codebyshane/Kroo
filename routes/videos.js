const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const videosController = require("../controllers/videos");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Video Routes - simplified for now
router.get("/:id", ensureAuth, videosController.getVideo);

router.post("/createVideo", upload.single("file"), videosController.createVideo);

router.put("/likeVideo/:id", videosController.likeVideo);

router.delete("/deleteVideo/:id", videosController.deleteVideo);

module.exports = router;
