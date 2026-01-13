import prisma from "../database";

export function findLike(userId: number, postId: number) {
  return prisma.like.findFirst({
    where: { userId, postId },
  });
}

export function createLike(userId: number, postId: number) {
  return prisma.like.create({
    data: { userId, postId },
  });
}

export function deleteLike(userId: number, postId: number) {
  return prisma.like.deleteMany({
    where: { userId, postId },
  });
}
