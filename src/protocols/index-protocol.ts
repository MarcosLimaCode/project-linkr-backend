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
  preview_description: string;
  preview_image: string;
  preview_title: string;
  userId: number;
};

export type postData = {
  title: string;
  description: string;
  images: [string];
  url: string;
};
