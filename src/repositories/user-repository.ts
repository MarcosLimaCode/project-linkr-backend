import prisma from "../database";

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email }
  });
}

export async function findUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username }
  });
}


export function createUser(data: {
  email: string;
  username: string;
  password: string;
  image: string;
}) {
  return prisma.user.create({
    data
  });
}