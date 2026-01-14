import express, { json, Request, Response } from "express";
import dotenv from "dotenv";
import httpStatus from "http-status";
import cors from "cors";

import userRouter from "./routes/index-router";
import { errorHandler } from "./middlewares/error-middleware";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.get("/health", (req: Request, res: Response) =>
  res.status(httpStatus.OK).send(`I'm okay!`)
);

app.use(userRouter);
app.use(errorHandler);

export default app;
