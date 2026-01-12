import { Request, Response } from "express";
import httpStatus from "http-status";
import { createUserService, loginUserServices } from "../services/user-service";
import { findUserByEmail } from "../repositories/user-repository";

export async function signUp(req: Request, res: Response) {
  const { email, password, username, image } = req.body;

  await createUserService({ email, password, username, image });

  return res.sendStatus(httpStatus.CREATED);
}

export async function loginUser(req: Request, res: Response) {
  try {
    const token = await loginUserServices(req.body);

    const user = await findUserByEmail(req.body.email);

    res.status(httpStatus.OK).send({ token, user });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
}
