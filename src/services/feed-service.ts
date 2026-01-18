import * as feedRepository from "../repositories/feed-repository";

export async function getFeed(userId: number) {
  const posts = await feedRepository.getFeedWithMetadata(userId);

  return posts.map((post) => {
    const liked = post.likes.some((like) => like.userId === userId);
    return {
      ...post,
      likesCount: post.likes.length,
      liked,
    };
  });
}

export async function getSuggestions(userId: number) {
  const suggestions = await feedRepository.getSuggestions(userId);
  return suggestions;
}
