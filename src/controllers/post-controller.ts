import { Request, Response } from "express";
import httpStatus from "http-status";
import { createPostServices } from "../services/post-service";

export async function createPost(req: Request, res: Response) {
  const userId = res.locals.userId;
  await createPostServices(req.body, userId);
  return res.sendStatus(httpStatus.CREATED);
}
