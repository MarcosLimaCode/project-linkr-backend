import { Request, Response } from "express";
import httpStatus from "http-status";
import { createUserService, loginUserServices } from "../services/user-service";

export async function signUp(req: Request, res: Response) {
  const { email, password, username, image } = req.body;

  await createUserService({ email, password, username, image });

  return res.sendStatus(httpStatus.CREATED);
}

export async function loginUser(req: Request, res: Response) {
  const { token, image } = await loginUserServices(req.body);
  res.status(200).send({ token, image });
  return;
}
