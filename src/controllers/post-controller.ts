import { Request, Response } from "express";
import httpStatus from "http-status";
import {
  createPostServices,
  deletePostServices,
  updatePostService,
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

export async function updatePost(req: Request, res: Response) {
  const id = Number(req.params.id);
  const result = await updatePostService(req.body, id);
  return res.status(httpStatus.OK).send(result);
}
