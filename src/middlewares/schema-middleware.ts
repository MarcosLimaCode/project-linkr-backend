import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export function validateSchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      convert: false,
    });
    if (error) {
      const message = error.details.map((detail) => detail.message);
      res.status(422).send(message);
      return;
    }
    next();
  };
}
