import { Router } from "express";
import { loginUser, signUp } from "../controllers/user-controller";
import { validateSchema } from "middlewares/schema.middleware";
import { loginSchema } from "schemas/index-schemas";

const userRouter = Router();

userRouter.post("/sign-up", signUp);
userRouter.post("/sign-in", validateSchema(loginSchema), loginUser);

export default userRouter;
