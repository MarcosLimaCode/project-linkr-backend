import dotenv from "dotenv";

import { postProtocol } from "../protocols/index-protocol";
import {
  createPostRepository,
  deletePostRepository,
  verifyIdRepository,
} from "../repositories/post-repository";
import { badRequest } from "../errors";

dotenv.config();

export async function createPostServices(req: postProtocol, userId: number) {
  return await createPostRepository(req, userId);
}

export async function deletePostServices(id: number) {
  const foundId = await verifyIdRepository(id);
  if (!foundId) throw badRequest("Post não encontrada.");
  return await deletePostRepository(id);
}
