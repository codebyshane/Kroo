const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const photosController = require("../controllers/photos");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Photo Routes - simplified for now
router.get("/:id", ensureAuth, photosController.getPhoto);

router.post("/createPhoto", upload.single("file"), photosController.createPhoto);

router.put("/likePhoto/:id", photosController.likePhoto);

router.delete("/deletePhoto/:id", photosController.deletePhoto);

module.exports = router;
