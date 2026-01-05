import bcrypt from "bcrypt";
import * as userRepository from "../repositories/user-repository";
import { badRequest, conflict } from "../errors";

export async function signupUser(data: {
  email: string;
  username: string;
  password: string;
  image?: string;
}) {
  const { email, username, password, image } = data;

  if (!email || !username || !password) {
    throw badRequest("Campos obrigatórios não preenchidos");
  }

  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw conflict("Email já cadastrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await userRepository.createUser({
    email,
    username,
    password: hashedPassword,
    image,
  });
}
