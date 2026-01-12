import { Request, Response } from "express";
import * as likeService from "../services/like-service";

export async function handleLike(req: Request, res: Response) {
  const userId = res.locals.user;
  const postId = Number(req.params.postId);

  try {
    const result = await likeService.toggleLike(userId, postId);
    res.status(200).send(result); 
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
