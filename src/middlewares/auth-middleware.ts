import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import prisma from "../database/index";
dotenv.config();

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: number;
    };

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      res.sendStatus(401);
      return;
    }

    res.locals.user = user.id;
    return next();
  } catch (error) {
    res.sendStatus(500);
    return;
  }
}
