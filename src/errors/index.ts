export function badRequest(message: string) {
  return {
    name: "BadRequestError",
    message,
  };
}

export function conflict(message: string) {
  return {
    name: "ConflictError",
    message,
  };
}

export function notFound(message: string) {
  return {
    name: "NotFoundError",
    message,
  };
}
