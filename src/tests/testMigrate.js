const sequelize = require("../utils/connection");
const request = require("supertest");
const app = require("../app");

const main = async () => {
  try {
    sequelize.sync();
    const testUser = {
      firstName: "Test",
      lastName: "User",
      email: "testemail@gmail.com",
      password: "testuser",
      phone: "123456789",
    };
    await request(app).post("/users").send(testUser);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

main();
