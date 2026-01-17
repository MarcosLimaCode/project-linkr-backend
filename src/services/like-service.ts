import {
  countLikes,
  createLike,
  deleteLike,
  findLike,
} from "../repositories/like-repository";

export async function toggleLikeService(postId: number, userId: number) {
  const like = await findLike(postId, userId);

  if (like) {
    await deleteLike(like.id);
  } else {
    await createLike(postId, userId);
  }

  const likesCount = await countLikes(postId);

  return {
    liked: !like,
    likesCount,
  };
}
