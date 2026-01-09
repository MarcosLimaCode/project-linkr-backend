import { Router } from "express";
import { loginUser, signUp } from "../controllers/user-controller";
import { validateSchema } from "../middlewares/schema-middleware";
import { loginSchema, signUpSchema } from "../schemas/index-schemas";

const userRouter = Router();

userRouter.post("/", validateSchema(loginSchema), loginUser);
userRouter.post("/sign-up", validateSchema(signUpSchema), signUp);

export default userRouter;
