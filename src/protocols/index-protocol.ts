export type signUpProtocol = {
  id: number;
  username: string;
  email: string;
  password: string;
  image: string;
};

export type signInProtocol = Omit<signUpProtocol, "id" | "username" | "image">;

export type postProtocol = {
  id: number;
  link: string;
  description: string;
};
