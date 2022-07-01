import Joi from "joi";
import { Card } from "../interfaces/card";

export const CardSchema = Joi.object<Card>({
  title: Joi.string().required(),
  text: Joi.string().required(),
});
