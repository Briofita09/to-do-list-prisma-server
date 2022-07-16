import supertest from "supertest";
import { prisma } from "../../src/database";

import { app } from "../../src/index";
import { generateUserBody, userLogin } from "../factories/user";
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

describe("GET /get-user", () => {
  it("should return 200 and an object referring a user when passed a valid token", async () => {
    const userToken = await userLogin();
    console.log(userToken);
    const userResponse = await supertest(app)
      .get("/get-user")
      .set("Authorization", "bearer" + userToken);
    expect(userResponse.status).toBe(200);
    expect(userResponse.body).toBeInstanceOf(Object);
  });

  it('should return 401 and the error: "Você deveria estar logado para continuar"', async () => {
    await userLogin();
    const token = " 111";
    const response = await supertest(app)
      .get("/get-user")
      .set("Authorization", "bearer" + token);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.message).toEqual(
      "Você deveria estar logado para continuar"
    );
  });
});

describe("PUT /edit-user", () => {
  it("should return 201 and a object with the edited user", async () => {
    const token = await userLogin();
    const newUser = {
      name: "Briofitinha",
      email: "briofita@briofita.com.br",
      password: "123",
      question: "123",
      answer: "123",
    };
    const response = await supertest(app)
      .put("/edit-user")
      .send(newUser)
      .set("Authorization", "bearer" + token);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('should return 401 and a error message: "Você deveria estar logado para continuar"', async () => {
    await userLogin();
    const token = " 111";
    const newUser = {
      name: "Briofitinha",
      email: "briofita@briofita.com.br",
      password: "123",
      question: "123",
      answer: "123",
    };
    const response = await supertest(app)
      .put("/edit-user")
      .send(newUser)
      .set("Authorization", "bearer" + token);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.message).toEqual(
      "Você deveria estar logado para continuar"
    );
  });
});
