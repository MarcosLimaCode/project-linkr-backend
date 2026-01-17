import { Request, Response } from "express";
import * as feedService from "../services/feed-service";

export async function getFeed(req: Request, res: Response) {
  const userId = res.locals.userId;
  const feed = await feedService.getFeed(userId);
  res.status(200).send(feed);
}

export async function getSuggestions(req: Request, res: Response) {
  const userId = res.locals.userId;
  const suggestions = await feedService.getSuggestions(userId);
  res.status(200).send(suggestions);
}

export async function getSuggestion(req: Request, res: Response) {
  //teste
}
