import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

export function errorHandler(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error.name === "BadRequestError") {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }

  if (error.name === "ConflictError") {
    return res.status(httpStatus.CONFLICT).send({ message: error.message });
  }

  if (error.name === "NotFoundError") {
    return res.status(httpStatus.NOT_FOUND).send({ message: error.message });
  }

  if (error.status) {
  return res.status(error.status).send({ message: error.message });
}


  console.error(error);

  return res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .send({ message: "Erro interno do servidor" });
}
