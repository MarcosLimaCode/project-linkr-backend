import { Request, Response } from "express";
import httpStatus from "http-status";
import {
  createPostServices,
  deletePostServices,
} from "../services/post-service";

export async function createPost(req: Request, res: Response) {
  const userId = res.locals.userId;
  await createPostServices(req.body, userId);
  return res.sendStatus(httpStatus.CREATED);
}

export async function deletePost(req: Request, res: Response) {
  const id = Number(req.params.id);
  await deletePostServices(id);
  res.sendStatus(204);
  return;
}
