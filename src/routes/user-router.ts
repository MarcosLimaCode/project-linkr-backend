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
import { getFeed } from "../controllers/feed-controller";

const userRouter = Router();

userRouter.post("/", validateSchema(loginSchema), loginUser);
userRouter.post("/sign-up", validateSchema(signUpSchema), signUp);
userRouter.post("/feed", validateToken, validateSchema(postSchema), createPost);
userRouter.get("/feed", getFeed);

export default userRouter;
