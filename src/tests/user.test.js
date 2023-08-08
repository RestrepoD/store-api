const request = require("supertest");
const app = require("../app");

let id;
let token;

test("POST /users must create a new user", async () => {
  const newUser = {
    firstName: "Carolina",
    lastName: "Ruiz",
    email: "karola69@gmail.com",
    password: "sexykaro",
    phone: "5102464",
  };
  const res = await request(app).post("/users").send(newUser);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(newUser.firstName);
});

test("POST /users/login must return the logged user", async () => {
  const loginBody = {
    email: "karola69@gmail.com",
    password: "sexykaro",
  };
  const res = await request(app).post(`/users/login`).send(loginBody);
  token = res.body.token;
  expect(res.status).toBe(201);
  expect(res.body.token).toBeDefined();
});

test("GET /users must get all users", async () => {
  const res = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBeDefined;
  expect(res.body).toBeInstanceOf(Array);
});

test("PUT /users/:id must edit a specified user", async () => {
  const updatedUser = {
    firstName: "Karolita",
    lastName: "Ruiz",
    phone: "5000464",
  };
  const res = await request(app)
    .put(`/users/${id}`)
    .send(updatedUser)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updatedUser.firstName);
});

test("DELETE /users/:id must delete aspecified user", async () => {
  const res = await request(app)
    .delete(`/users/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
