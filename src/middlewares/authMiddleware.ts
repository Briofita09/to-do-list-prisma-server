import { NextFunction, Request, Response } from "express";
import { findToken } from "../repositories/userRepository";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const isAutenticated = req.header("Authorization");
    if (!isAutenticated)
      return res
        .status(401)
        .json({ message: "Você deveria estar logado para continuar" });
    const token = isAutenticated.split(" ")[1];
    const user = await findToken(token);
    res.locals.user = user;
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
  next();
}
