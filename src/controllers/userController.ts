import { Request, Response } from "express";

import { User } from "../interfaces/user";
import * as userService from "../services/userServices";
import * as userRepository from "../repositories/userRepository";

export async function createUser(req: Request, res: Response) {
  try {
    const user: User = req.body;
    const userExist = await userService.createUser(user);

    if (!userExist)
      return res
        .status(409)
        .json({ message: "Já existe um usuário cadastrado com esse email" });

    return res
      .status(201)
      .json({ message: "Usuário cadastrado com sucesso", userExist });
  } catch (err) {
    console.log(err);
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const user: User = req.body;

    const confirmedUser = await userService.loginUser(user);

    if (!confirmedUser)
      return res
        .status(401)
        .json({ message: "Email e/ou senha não são compativeis" });

    return res.status(200).json({ token: confirmedUser });
  } catch (err) {
    console.log(err);
  }
}

export async function getUser(_req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const foundUser = await userRepository.findUserByEmail(user[0].email);
    if (!foundUser)
      return res.status(404).json({ message: "Usuário não encontrado" });
    return res.status(200).json({ foundUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

export async function editUser(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const editUser: User = req.body;

    const editedUser = await userService.editUser(user[0].id, editUser);

    if (!editedUser)
      return res.status(404).json({ message: "Usuário não encontrado" });

    return res.status(200).json(editedUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

export async function getUserQuestion(req: Request, res: Response) {
  try {
    const { email } = req.body;

    const userQuestion = await userService.getUserQuestion(email);

    if (!userQuestion)
      return res.status(404).json({ message: "Usuário não encontrado" });
    return res.status(200).json(userQuestion);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

export async function changePassowrd(req: Request, res: Response) {
  try {
    const user = req.body;

    const changePassword = await userService.changePassword(user);

    if (!changePassword)
      return res.status(404).json({ message: "Usuário não encontrado" });
    if (changePassword)
      return res.status(200).json({ message: "Senha alterada com sucesso" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
