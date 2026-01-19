import { Request, Response } from "express";
import httpStatus from "http-status";
import {
  createUserService,
  findUserService,
  loginUserServices,
} from "../services/user-service";

export async function signUp(req: Request, res: Response) {
  const { email, password, username, image } = req.body;

  await createUserService({ email, password, username, image });

  return res.sendStatus(httpStatus.CREATED);
}

export async function loginUser(req: Request, res: Response) {
  const token = await loginUserServices(req.body);
  res.status(200).send(token);
  return;
}

export async function getMyProfile(req: Request, res: Response) {
  const id = Number(res.locals.userId);
  const result = await findUserService(id);

  return res.status(httpStatus.OK).send(result);
}

export async function getProfile(req: Request, res: Response) {
  const id = Number(req.params.id);
  const result = await findUserService(id);
  return res.status(httpStatus.OK).send(result);
}
