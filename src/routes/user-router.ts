import { Router } from "express";
import { loginUser, signUp } from "../controllers/user-controller";

const userRouter = Router();

userRouter.post("/sign-up", signUp);
userRouter.post("/sign-in", loginUser);

export default userRouter;
