const express = require("express");
const router = express.Router();
const userRouter = require("./user.router");
const categoryRouter = require("./category.router");
const productRouter = require("./product.router");
const imageRouter = require("./image.router");
const cartRouter = require("./cart.router");
const purchaseRouter = require("./purchase.router");

router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/product_images", imageRouter);
router.use("/cart", cartRouter);
router.use("/purchases", purchaseRouter);

module.exports = router;
