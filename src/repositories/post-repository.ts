import { postData, postProtocol } from "protocols/index-protocol";
import prisma from "../database";

export async function createPostRepository(
  req: postProtocol,
  userId: number,
  url: postData
) {
  const result = await prisma.post.create({
    data: {
      link: req.link,
      description: req.description,
      userId: userId,
      preview_description: url.description,
      preview_image: url.images[0],
      preview_title: url.title,
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
  await prisma.like.deleteMany({
    where: {
      postId: id,
    },
  });
  return await prisma.post.delete({
    where: {
      id,
    },
  });
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
