import Joi from "joi";
import { User } from "../interfaces/user";

export const LoginSchema = Joi.object<User>({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
