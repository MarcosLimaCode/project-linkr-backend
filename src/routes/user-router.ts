import { Router } from "express";
import { signUp } from "../controllers/user-controller";

const userRouter = Router();

userRouter.post("/sign-up", signUp);

export default userRouter;