import { Router } from "express";
import {
  findUser,
  getMyProfile,
  loginUser,
  signUp,
} from "../controllers/user-controller";
import { validateSchema } from "../middlewares/schema-middleware";
import {
  loginSchema,
  postSchema,
  signUpSchema,
} from "../schemas/index-schemas";
import { createPost } from "../controllers/post-controller";
import { validateToken } from "../middlewares/auth-middleware";
import { getFeed } from "../controllers/feed-controller";
import { handleLike } from "../controllers/like-controller";

const userRouter = Router();

userRouter.get("/user/my-profile", validateToken, getMyProfile);
userRouter.get("/user/:id", findUser);
userRouter.post("/", validateSchema(loginSchema), loginUser);
userRouter.post("/sign-up", validateSchema(signUpSchema), signUp);

userRouter.get("/feed", getFeed);
userRouter.post("/feed", validateToken, validateSchema(postSchema), createPost);
userRouter.post("/:postId", validateToken, handleLike);

export default userRouter;
