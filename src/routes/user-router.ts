import { Router } from "express";
import { loginUser, signUp } from "../controllers/user-controller";
import { validateSchema } from "../middlewares/schema-middleware";
import {
  loginSchema,
  postSchema,
  signUpSchema,
} from "../schemas/index-schemas";
import { createPost } from "../controllers/post-controller";
import { validateToken } from "../middlewares/auth-middleware";

const userRouter = Router();

userRouter.post("/", validateSchema(loginSchema), loginUser);
userRouter.post("/sign-up", validateSchema(signUpSchema), signUp);
userRouter.post("/feed", validateToken, validateSchema(postSchema), createPost);

export default userRouter;
