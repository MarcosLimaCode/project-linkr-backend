import { Request, Response } from "express";
import httpStatus from "http-status";
import { signupUser } from "../services/user-service";

export async function signUp(req: Request, res: Response) {
  const { email, username, password, image } = req.body;

  await signupUser({ email, username, password, image });

  return res.sendStatus(httpStatus.CREATED);
}
