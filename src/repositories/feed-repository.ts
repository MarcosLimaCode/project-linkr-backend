import prisma from "../database";

export async function getFeed(userId: number) {
  return prisma.post.findMany({
    take: 20,
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
