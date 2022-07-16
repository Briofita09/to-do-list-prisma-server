import supertest from "supertest";
import { app } from "../../src";

export function generateUserBody() {
  return {
    name: "Briofita",
    email: "briofita@briofita.com.br",
    password: "123",
    question: "123",
    answer: "123",
  };
}

export function BodyLogin() {
  const user = {
    email: "briofita@briofita.com.br",
    password: "123",
  };
  return user;
}

export async function userLogin() {
  const newUser = generateUserBody();
  await supertest(app).post("/sign-up").send(newUser);
  const userLogin = BodyLogin();
  const response = await supertest(app).post("/login").send(userLogin);
  const userToken = response.body.token;
  return userToken;
}
