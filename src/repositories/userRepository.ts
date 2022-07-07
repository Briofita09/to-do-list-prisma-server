import { prisma } from "../database";
import { User } from "../interfaces/user";

export async function createNewUser(
  email: string,
  hashedAnswer: string,
  name: string,
  hashedPassword: string,
  question: string
) {
  const user = await prisma.user.create({
    data: {
      email: email,
      answer: hashedAnswer,
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

export async function editUser(userId: number, user: User) {
  const editedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: user.name,
      email: user.email,
      question: user.question,
      answer: user.answer,
    },
  });
  return editedUser;
}

export async function getUserQuestion(email: string) {
  const userQuestion = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return userQuestion?.question;
}

export async function changePassword(user: User, password: string) {
  const editedUser = await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      password,
    },
  });
  return editedUser;
}
