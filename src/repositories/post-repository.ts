import { postProtocol } from "protocols/index-protocol";
import prisma from "../database";

export async function createPostRepository(req: postProtocol, userId: number) {
  const result = await prisma.post.create({
    data: {
      link: req.link,
      description: req.description,
      userId: userId,
    },
  });
  return result;
}
