const catchError = require("../utils/catchError");
const Purchase = require("../models/Purchase");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Image = require("../models/Image");

const getAll = catchError(async (req, res) => {
  const purchases = await Purchase.findAll({
    include: [{ model: Product, include: [Image] }],
    where: { userId: req.user.id },
  });

  return res.json(purchases);
});

const create = catchError(async (req, res) => {
  const cartProducts = await Cart.findAll({
    where: { userId: req.user.id },
    attributes: ["quantity", "userId", "productId"],
    raw: true,
  });
  await Cart.destroy({ where: { userId: req.user.id } });
  const purchases = await Purchase.bulkCreate(cartProducts);

  return res.status(201).json(purchases);
});

module.exports = {
  getAll,
  create,
};
