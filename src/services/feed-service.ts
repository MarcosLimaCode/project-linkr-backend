import * as feedRepository from "../repositories/feed-repository";

export async function getFeed() {
  return feedRepository.getFeed();
}
