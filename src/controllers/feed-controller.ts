import { Request, Response } from "express";
import * as feedService from "../services/feed-service";

export async function getFeed(req: Request, res: Response) {
  const feed = await feedService.getFeed();
  return res.status(200).send(feed);
}