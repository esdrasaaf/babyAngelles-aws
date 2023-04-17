import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ObjectSchema } from "joi";

export function validateBody<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema);
}

function validate(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (!error) {
      next();
    } else {
      if (error.details[0].path[0] === "image") res.status(httpStatus.BAD_REQUEST).send("Url da imagem inválido!");
      res.status(httpStatus.BAD_REQUEST).send("E-mail ou senha inválidos!");
    }
  };
}

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction)=> void;