import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { conflict, badRequest, notFound, unauthorizedError } from "../errors";
import {
  createUserRepository,
  findUserByEmailRepository,
  findUserByIdRepository,
  findUserByUsernameRepository,
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

  const emailExists = await findUserByEmailRepository(email);
  if (emailExists) {
    throw conflict("Email já cadastrado");
  }

  const usernameExists = await findUserByUsernameRepository(username);
  if (usernameExists) {
    throw conflict("Username já está em uso");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await createUserRepository({
    email,
    password: hashedPassword,
    username,
    image,
  });
}

export async function loginUserServices(req: signInProtocol) {
  const user = await verifyEmailRepository(req.email);
  if (!user) throw notFound("Email não encontrado.");
  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: 86400 }
  );

  const checkPassword = bcrypt.compareSync(req.password, user.password);
  if (!checkPassword) throw unauthorizedError("Senha incorreta.");

  return { token, image: user.image, user };
}

export async function findUserService(id: number) {
  const user = await findUserByIdRepository(id);
  if (!user) throw notFound("Usuário não encontrado.");

  return { user };
}
