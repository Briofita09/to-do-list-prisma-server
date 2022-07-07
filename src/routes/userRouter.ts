import { Router } from "express";
import * as userController from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { changePasswordSchema } from "../schemas/changePasswordSchema";
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
userRouter.get("/get-user", authMiddleware, userController.getUser);
userRouter.put("/edit-user", authMiddleware, userController.editUser);
userRouter.get("/get-question", userController.getUserQuestion);
userRouter.put(
  "/change-password",
  validateSchemaMiddleware(changePasswordSchema),
  userController.changePassowrd
);

export { userRouter };
