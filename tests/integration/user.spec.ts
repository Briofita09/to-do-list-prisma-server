import supertest from "supertest";
import { prisma } from "../../src/database";

import { app } from "../../src/index";
import { generateUserBody } from "../factories/user";
beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE Users RESTART IDENTITY CASCADE`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /sign-up", () => {
  it("should return 201 when the test pass a valid user body and the email is not yet registred", async () => {
    const user = generateUserBody();
    const response = await supertest(app).post("/sign-up").send(user);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
  });
  it("should return 409 when the test pass a valid user body and the email is registred", async () => {
    const user = generateUserBody();
    await supertest(app).post("/sign-up").send(user);
    const response = await supertest(app).post("/sign-up").send(user);
    expect(response.status).toBe(409);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.message).toEqual(
      "Já existe um usuário cadastrado com esse email"
    );
  });
  it("should return 400 when the test pass a invalid user body", async () => {
    const user = {};
    const response = await supertest(app).post("/sign-up").send(user);
    expect(response.status).toBe(400);
  });
});

describe("POST /login", () => {
  it("should return 200 when the test pass a valid login body", async () => {
    const newUser = generateUserBody();
    await supertest(app).post("/sign-up").send(newUser);
    const user = {
      email: "briofita@briofita.com.br",
      password: "123",
    };
    const response = await supertest(app).post("/login").send(user);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
  it("should return 401 when the test pass a invalid password", async () => {
    const newUser = generateUserBody();
    await supertest(app).post("/sign-up").send(newUser);
    const user = {
      email: "briofita@briofita.com.br",
      password: "124",
    };
    const response = await supertest(app).post("/login").send(user);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.message).toEqual(
      "Email e/ou senha não são compativeis"
    );
  });
  it("should return 401 when the test pass a invalid email", async () => {
    const newUser = generateUserBody();
    await supertest(app).post("/sign-up").send(newUser);
    const user = {
      email: "briofitinha@briofita.com.br",
      password: "123",
    };
    const response = await supertest(app).post("/login").send(user);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.message).toEqual(
      "Email e/ou senha não são compativeis"
    );
  });
  it("should return 400 when the test pass a invalid body", async () => {
    const user = {};
    const response = await supertest(app).post("/login").send(user);
    expect(response.status).toBe(400);
  });
});
