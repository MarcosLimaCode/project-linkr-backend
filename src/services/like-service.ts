import * as likeRepository from "../repositories/like-repository";

export async function toggleLike(userId: number, postId: number) {
  const existingLike = await likeRepository.findLike(userId, postId);

  if (existingLike) {
    await likeRepository.deleteLike(userId, postId);
    return { liked: false };
  } else {
    await likeRepository.createLike(userId, postId);
    return { liked: true };
  }
}
