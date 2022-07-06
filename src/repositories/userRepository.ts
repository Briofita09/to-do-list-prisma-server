import { prisma } from "../database";

export async function createNewUser(
  email: string,
  answer: string,
  name: string,
  hashedPassword: string,
  question: string
) {
  const user = await prisma.user.create({
    data: {
      email: email,
      answer: answer,
      password: hashedPassword,
      question: question,
      name: name,
    },
  });
  return user;
}

export async function findUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}

export async function findToken(token: string) {
  const user = await prisma.user.findMany({
    where: {
      token: token,
    },
  });
  return user;
}
