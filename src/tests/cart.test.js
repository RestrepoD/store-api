const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
require("../models");

let id;
let token;

beforeAll(async () => {
  const res = await request(app)
    .post("/users/login")
    .send({ email: "testemail@gmail.com", password: "testuser" });
  token = res.body.token;
});

test("GET /cart must get all cart products", async () => {
  const res = await request(app)
    .get("/cart")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /cart must create a new cart product", async () => {
  const product = await Product.create({
    title: "A",
    description: "abcdefg",
    brand: "Pro",
    price: "100",
  });
  const cart = {
    productId: product.id,
    quantity: 1,
  };
  const res = await request(app)
    .post("/cart")
    .send(cart)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;
  await product.destroy();
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.quantity).toBe(cart.quantity);
});

test("PUT /cart/:id must edit a cart product", async () => {
  const updated = {
    quantity: 2,
  };
  const res = await request(app)
    .put(`/cart/${id}`)
    .send(updated)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.quantity).toBe(updated.quantity);
});

test("DELETE /cart/:id must delete a cart product", async () => {
  const res = await request(app)
    .delete(`/cart/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
