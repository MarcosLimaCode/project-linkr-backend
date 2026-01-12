import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { conflict, badRequest, notFound, unauthorizedError } from "../errors";
import {
  createUser,
  findUserByEmail,
  findUserByUsername,
  verifyEmailRepository,
} from "../repositories/user-repository";
import { signInProtocol } from "protocols/index-protocol";

dotenv.config();

export async function createUserService({
  email,
  password,
  username,
  image,
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
    image,
  });
}


export async function loginUserServices(req: signInProtocol) {
  const foundEmail = await verifyEmailRepository(req.email);
  if (!foundEmail) throw notFound("Email não encontrado.");

  const password = req.password.trim();

  const checkPassword = bcrypt.compareSync(password, foundEmail.password);
  if (!checkPassword) throw unauthorizedError("Senha incorreta.");

  const token = jwt.sign(
    { userId: foundEmail.id },
    process.env.JWT_SECRET,
    { expiresIn: 86400 }
  );

  return token;
}

