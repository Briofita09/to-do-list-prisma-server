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
  const newUser = await userRepository.createNewUser(
    user.email,
    user.answer,
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

export async function updateUser(user: User) {}
