import dotenv from "dotenv";

import { postProtocol } from "../protocols/index-protocol";
import {
  createPostRepository,
  deletePostRepository,
  updatePostRepository,
  verifyIdRepository,
} from "../repositories/post-repository";
import { badRequest, notFound } from "../errors";

dotenv.config();

export async function createPostServices(req: postProtocol, userId: number) {
  return await createPostRepository(req, userId);
}

export async function deletePostServices(id: number) {
  const foundId = await verifyIdRepository(id);
  if (!foundId) throw badRequest("Post não encontrada.");
  return await deletePostRepository(id);
}

export async function updatePostService(req: postProtocol, id: number) {
  const user = await updatePostRepository(req, id);
  if (!user) throw notFound("Post não encontrado.");

  return { user };
}
