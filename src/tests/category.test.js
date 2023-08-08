const request = require("supertest");
const app = require("../app");

let id;
let token;

beforeAll(async () => {
  const res = await request(app)
    .post("/users/login")
    .send({ email: "testemail@gmail.com", password: "testuser" });
  token = res.body.token;
});

test("GET /categories must return all categories", async () => {
  const res = await request(app).get("/categories");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /categories must create a new category", async () => {
  const newCategory = { name: "Test Category" };
  const res = await request(app)
    .post("/categories")
    .send(newCategory)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("PUT /categories/:id must edit a specified category", async () => {
  const updatedCategory = { name: "Test Category 2" };
  const res = await request(app)
    .put(`/categories/${id}`)
    .send(updatedCategory)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
});

test("DELETE /categories/:id must delete a specified category", async () => {
  const res = await request(app)
    .delete(`/categories/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
