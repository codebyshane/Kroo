const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const wishlistsController = require("../controllers/wishlists");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Wishlist Routes - simplified for now
router.get("/:id", ensureAuth, wishlistsController.getWishlist);

router.post("/createWishlist", upload.single("file"), wishlistsController.createWishlist);

router.put("/likeWishlist/:id", wishlistsController.likeWishlist);

router.delete("/deleteWishlist/:id", wishlistsController.deleteWishlist);

router.patch("/editWishlist/:id", wishlistsController.editWishlist);

module.exports = router;
