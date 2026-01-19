import { Request, Response } from "express";
import * as feedService from "../services/feed-service";

export async function getFeed(req: Request, res: Response) {
  const userId = res.locals.userId;

  const limit = Number(req.query.limit) || 10;
  const offset = Number(req.query.offset) || 0;

  const feed = await feedService.getFeed(userId, limit, offset);
  res.status(200).send(feed);
}

export async function getSuggestions(req: Request, res: Response) {
  const userId = res.locals.userId;
  const suggestions = await feedService.getSuggestions(userId);
  res.status(200).send(suggestions);
}
