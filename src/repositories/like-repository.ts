import prisma from "../database";

export function findLike(postId: number, userId: number) {
  return prisma.like.findFirst({
    where: { userId, postId },
  });
}

export function createLike(postId: number, userId: number) {
  return prisma.like.create({
    data: { userId, postId },
  });
}

export function deleteLike(likeId) {
  return prisma.like.deleteMany({
    where: { id: likeId },
  });
}

export function countLikes(postId: number) {
  return prisma.like.count({
    where: { postId },
  });
}
