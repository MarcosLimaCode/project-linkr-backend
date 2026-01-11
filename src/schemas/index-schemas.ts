import joi from "joi";
import {
  postProtocol,
  signInProtocol,
  signUpProtocol,
} from "protocols/index-protocol";

export const signUpSchema = joi.object<signUpProtocol>({
  username: joi.string().required().invalid(null),
  email: joi.string().required().email(),
  password: joi.string().required().min(6),
  image: joi.string().required().uri(),
});

export const loginSchema = joi.object<signInProtocol>({
  email: joi.string().required().email().invalid(null),
  password: joi.string().required().min(6),
});

export const postSchema = joi.object<postProtocol>({
  link: joi.string().required().uri(),
  description: joi.string(),
});
