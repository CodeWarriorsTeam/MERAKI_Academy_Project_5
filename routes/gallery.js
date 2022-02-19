const express = require("express");

const { addImageToGallery, getAllImage } = require("../controllers/gallery");
const galleryRouter = express.Router();

galleryRouter.post("/", addImageToGallery);
galleryRouter.get("/", getAllImage);

module.exports = galleryRouter;
