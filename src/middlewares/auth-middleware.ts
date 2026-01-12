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
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };

    const user = await prisma.user.findFirst({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.sendStatus(401);
    }

    res.locals.userId = user.id;
    next();
  } catch (error) {
    return res.sendStatus(500);
  }
}
