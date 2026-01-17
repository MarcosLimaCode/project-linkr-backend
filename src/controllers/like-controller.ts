import { Request, Response } from "express";
import { toggleLikeService } from "../services/like-service";

export async function toggleLike(req: Request, res: Response) {
  const postId = Number(req.params.id);
  const userId = res.locals.userId;

  if (!postId) {
    return res.sendStatus(400);
  }

  const result = await toggleLikeService(postId, userId);

  return res.status(200).send(result);
}
