const request = require("supertest");
const app = require("../app");
const Image = require("../models/Image");

let id;
let token;

beforeAll(async () => {
  const res = await request(app)
    .post("/users/login")
    .send({ email: "testemail@gmail.com", password: "testuser" });
  token = res.body.token;
});

test("GET /products must get all products", async () => {
  const res = await request(app).get("/products");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /products must create a new product", async () => {
  const newProduct = {
    title: "Cellphone 1",
    description: "New cellphone",
    brand: "Best brand",
    price: "10000",
  };
  const res = await request(app)
    .post("/products")
    .send(newProduct)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.title).toBe(newProduct.title);
});

test("PUT /products/:id must edit aspecified test", async () => {
  const updatedProduct = {
    title: "Cellphone 2",
    description: "New new cellphone",
    brand: "Best brand x 2",
    price: "10001",
  };
  const res = await request(app)
    .put(`/products/${id}`)
    .send(updatedProduct)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
});

test("POST /products/:id/images must link imagesto a product", async () => {
  const image = await Image.create({ url: "whatever", publicId: "whateverx2" });
  const res = await request(app)
    .post(`/products/${id}/images`)
    .send([image.id])
    .set("Authorization", `Bearer ${token}`);
  await image.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("DELETE /products/:id must delete a specified product", async () => {
  const res = await request(app)
    .delete(`/products/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
