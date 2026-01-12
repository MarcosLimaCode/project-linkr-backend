import prisma from "../database";

export async function getFeed() {
  return prisma.post.findMany({
    take: 20,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          image: true,
        },
      },
      likes: {
        select: {
          userId: true,
        },
      },
    },
  });
}
