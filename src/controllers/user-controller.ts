import { Request, Response } from "express";
import httpStatus from "http-status";
import { createUserService } from "../services/user-service";

export async function signUp(req: Request, res: Response) {
  const { email, password, username, image } = req.body;

  await createUserService({ email, password, username, image });

  return res.sendStatus(httpStatus.CREATED);
}
