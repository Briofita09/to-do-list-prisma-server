import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

import { User } from "../interfaces/user";
import * as userRepository from "../repositories/userRepository";

const numberOfSalts = 10;

export async function createUser(user: User) {
  const userExist = await userRepository.findUserByEmail(user.email);
  if (userExist) return null;
  const salt = bcrypt.genSaltSync(numberOfSalts);
  const hashedPassword = bcrypt.hashSync(user.password, salt);
  const hashedAnswer = bcrypt.hashSync(user.answer, salt);
  const newUser = await userRepository.createNewUser(
    user.email,
    hashedAnswer,
    user.name,
    hashedPassword,
    user.question
  );
  return newUser;
}

export async function loginUser(user: User) {
  const userExist = await userRepository.findUserByEmail(user.email);
  if (!userExist) return null;
  if (!bcrypt.compareSync(user.password, userExist.password)) return null;
  return userExist.token;
}

export async function editUser(userId: number, user: User) {
  return await userRepository.editUser(userId, user);
}

export async function getUserQuestion(email: string) {
  const userQuestion = await userRepository.getUserQuestion(email);

  return userQuestion;
}

export async function changePassword(user: User) {
  const foundUser = await userRepository.findUserByEmail(user.email);
  if (!foundUser) return null;
  if (
    foundUser.email === user.email &&
    bcrypt.compareSync(user.answer, foundUser.answer)
  ) {
    const salt = bcrypt.genSaltSync(numberOfSalts);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    return await userRepository.changePassword(user, hashedPassword);
  }

  return null;
}
