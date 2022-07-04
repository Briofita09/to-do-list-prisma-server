import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

import { Errors } from "../errors/errors";

export function validateSchemaMiddleware(schema: ObjectSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const message = error.details[0].message;
      throw new Errors(message, 400);
    }
    next();
  };
}
