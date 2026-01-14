import { Request, Response } from "express";
import httpStatus from "http-status";
import {
  createUserService,
  findUserService,
  loginUserServices,
} from "../services/user-service";

export async function signUp(req: Request, res: Response) {
  const { email, password, username, image } = req.body;

  await createUserService({ email, password, username, image });

  return res.sendStatus(httpStatus.CREATED);
}

export async function loginUser(req: Request, res: Response) {
  const { token, image, user } = await loginUserServices(req.body);
  res.status(httpStatus.OK).send({ token, image, user });
  return;
}

export async function findUser(req: Request, res: Response) {
  // Adicionar logica para retornar informações do usuário de acordo com o Id enviado por parametro.
  // Observando o que o Frontend precisa. Mas a base está realizada.

  const id = Number(req.params.id);
  const result = await findUserService(id);
  return res.status(httpStatus.OK).send(result);
}
