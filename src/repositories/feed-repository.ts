import { getLinkPreview } from "link-preview-js";
import prisma from "../database";

export async function getFeedRepository(
  userId: number,
  limit: number,
  offset: number
) {
  return prisma.post.findMany({
    take: limit,
    skip: offset,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          image: true,
        },
      },
      likes: {
        select: { userId: true },
      },
    },
  });
}


export async function getSuggestions(userId: number) {
  return prisma.user.findMany({
    take: 10,
    orderBy: { id: "desc" },
    where: {
      NOT: {
        id: userId,
      },
    },
  });
}
