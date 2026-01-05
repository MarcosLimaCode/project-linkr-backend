import bcrypt from "bcrypt";
import { conflict, badRequest } from "../errors";
import { createUser, findUserByEmail, findUserByUsername } from "../repositories/user-repository";

export async function createUserService({
  email,
  password,
  username,
  image
}: {
  email: string;
  password: string;
  username: string;
  image: string;
}) {
  if (!email || !password || !username || !image) {
    throw badRequest("Todos os campos são obrigatórios");
  }

  const emailExists = await findUserByEmail(email);
  if (emailExists) {
    throw conflict("Email já cadastrado");
  }

  const usernameExists = await findUserByUsername(username);
  if (usernameExists) {
    throw conflict("Username já está em uso");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await createUser({
    email,
    password: hashedPassword,
    username,
    image
  });
}
