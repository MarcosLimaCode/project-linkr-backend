import dotenv from "dotenv";

import { postData, postProtocol } from "../protocols/index-protocol";
import {
  createPostRepository,
  deletePostRepository,
  updatePostRepository,
  verifyIdRepository,
} from "../repositories/post-repository";
import { badRequest, notFound } from "../errors";
import { getLinkPreview } from "link-preview-js";

dotenv.config();

export async function createPostServices(req: postProtocol, userId: number) {
  const url: any = await getLinkPreview(req.link);

  return await createPostRepository(req, userId, url);
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
