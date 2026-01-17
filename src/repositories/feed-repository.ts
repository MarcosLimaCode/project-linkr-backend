import { getLinkPreview } from "link-preview-js";
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

interface Metadata {
  title: string;
  description: string;
  images: [string];
  url: string;
}

export async function getFeedWithMetadata(userId: number) {
  const posts = await getFeed(userId);

  const postsWithMetadata = await Promise.all(
    posts.map(async (post) => {
      let metadata: Metadata = {
        title: "Título Indisponível",
        description: "Descrição Indisponível",
        images: [
          "https://img.freepik.com/vetores-premium/pagina-nao-encontrada-ilustracao-do-conceito_114360-1869.jpg",
        ],
        url: post.link || "",
      };

      if (post.link) {
        try {
          const url: Record<string, any> = await getLinkPreview(post.link);

          metadata = {
            title: url.title || url["og:title"] || "Título Indisponível",
            description: url.description || url["og:description"] || post.link,
            images:
              url.images ||
              "https://img.freepik.com/vetores-premium/pagina-nao-encontrada-ilustracao-do-conceito_114360-1869.jpg",
            url: post.link,
          };
        } catch (err) {
          console.error(`Erro ao buscar metadata do post ${post.id}:`, err);
        }
      }

      return {
        ...post,
        metadata,
      };
    })
  );

  return postsWithMetadata;
}
