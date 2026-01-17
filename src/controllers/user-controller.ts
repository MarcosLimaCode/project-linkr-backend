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
  const token = await loginUserServices(req.body);
  res.status(200).send({ token });
  return;
}

export async function findUser(req: Request, res: Response) {
  // Adicionar logica para retornar informações do usuário de acordo com o Id enviado por parametro.
  // Observar o que o Frontend precisa. Mas a base está realizada.

  const id = Number(req.params.id);
  const result = await findUserService(id);
  return res.status(httpStatus.OK).send(result);
}


export async function getMyProfile(req: Request, res: Response) {
  try {
    const id = Number(res.locals.userId);

    if (!id) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        message: "Usuário não autenticado",
      });
    }

    const { user } = await findUserService(id);

    return res.status(httpStatus.OK).send({
      name: user.username,
      age: user.age,
      image: user.image,
      about: user.about,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Erro ao buscar perfil do usuário",
    });
  }
}