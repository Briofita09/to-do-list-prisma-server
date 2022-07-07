import Joi from "joi";

export const changePasswordSchema = Joi.object({
  email: Joi.string().required(),
  question: Joi.string().required(),
  answer: Joi.string().required(),
  password: Joi.string().required(),
});
