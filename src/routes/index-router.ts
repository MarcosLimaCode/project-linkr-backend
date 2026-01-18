import { Router } from "express";
import {
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
import {
  createPost,
  deletePost,
  updatePost,
} from "../controllers/post-controller";
import { validateToken } from "../middlewares/auth-middleware";
import { getFeed, getSuggestions } from "../controllers/feed-controller";
import { toggleLike } from "../controllers/like-controller";

const userRouter = Router();

userRouter.get("/user/my-profile", validateToken, getMyProfile);
userRouter.post("/", validateSchema(loginSchema), loginUser);
userRouter.post("/sign-up", validateSchema(signUpSchema), signUp);

userRouter.get("/feed", validateToken, getFeed);
userRouter.get("/suggestions", validateToken, getSuggestions);
userRouter.post("/feed", validateToken, validateSchema(postSchema), createPost);

userRouter.post("/post/:id/like", validateToken, toggleLike);
userRouter.put(
  "/post/:id",
  validateToken,
  validateSchema(postSchema),
  updatePost
);
userRouter.delete("/post/:id", validateToken, deletePost);

export default userRouter;
