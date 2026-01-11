import dotenv from "dotenv";

import { postProtocol } from "../protocols/index-protocol";
import { createPostRepository } from "../repositories/post-repository";

dotenv.config();

export async function createPostServices(req: postProtocol, userId: number) {
  return await createPostRepository(req, userId);
}
