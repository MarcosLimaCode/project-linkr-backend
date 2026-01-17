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

export async function verifyIdRepository(id: number) {
  const result = await prisma.post.findFirst({
    where: {
      id,
    },
  });
  return result;
}

export async function deletePostRepository(id: number) {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });
  return result;
}

export function updatePostRepository(req: postProtocol, id: number) {
  return prisma.post.update({
    where: {
      id: id,
    },
    data: {
      link: req.link,
      description: req.description,
    },
  });
}
