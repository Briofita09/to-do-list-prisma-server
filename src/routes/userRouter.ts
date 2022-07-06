import { Router } from "express";
import * as userController from "../controllers/userController";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { LoginSchema } from "../schemas/LoginSchema";
import { UserSchema } from "../schemas/userSchema";

const userRouter = Router();

userRouter.post(
  "/sign-up",
  validateSchemaMiddleware(UserSchema),
  userController.createUser
);
userRouter.post(
  "/login",
  validateSchemaMiddleware(LoginSchema),
  userController.loginUser
);

export { userRouter };
