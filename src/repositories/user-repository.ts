import prisma from "../database";

export function findUserByEmailRepository(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export function findUserByIdRepository(id: number) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function findUserByUsernameRepository(username: string) {
  return prisma.user.findUnique({
    where: { username },
  });
}

export function createUserRepository(data: {
  email: string;
  username: string;
  password: string;
  image: string;
}) {
  return prisma.user.create({
    data,
  });
}

export async function verifyEmailRepository(email: string) {
  const result = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  return result;
}
