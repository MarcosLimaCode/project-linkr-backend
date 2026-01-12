import * as feedRepository from "../repositories/feed-repository";

export async function getFeed(userId: number) {
  const posts = await feedRepository.getFeed(userId);

  return posts.map(post => {
    const liked = post.likes.some(like => like.userId === userId);

    return {
      ...post,
      likesCount: post.likes.length,
      liked,
      likes: undefined, // opcional: remove lista crua de likes
    };
  });
}
