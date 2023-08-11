const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");

router
  .route("/")
  .get(imageController.getImages)
  .post(imageController.createImage)
  .patch(imageController.updateImage)
  .delete(imageController.deleteImage);

module.exports = router;
