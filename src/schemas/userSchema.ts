import Joi from "joi";
import { User } from "../interfaces/user";

export const UserSchema = Joi.object<User>({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  question: Joi.string().required(),
  answer: Joi.string().required(),
});
