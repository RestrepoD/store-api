const { getAll, create, remove } = require("../controllers/image.controllers");
const express = require("express");
const verifyJWT = require("../utils/verifyJWT");
const imageRouter = express.Router();
const upload = require("../utils/multer");

imageRouter
  .route("/")
  .get(verifyJWT, getAll)
  .post(upload.single("image"), create);
imageRouter.route("/:id").delete(verifyJWT, remove);

module.exports = imageRouter;
