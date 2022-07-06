import { Request, Response } from "express";

import { User } from "../interfaces/user";
import * as userService from "../services/userServices";

export async function createUser(req: Request, res: Response) {
  try {
    const user: User = req.body;
    const userExist = await userService.createUser(user);

    if (!userExist)
      return res
        .status(409)
        .json({ message: "Já existe um usuário cadastrado com esse email" });

    return res
      .status(202)
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
        .json({ message: "Login e/ou senha não são compativeis" });

    return res.status(200).json({ token: confirmedUser });
  } catch (err) {
    console.log(err);
  }
}
