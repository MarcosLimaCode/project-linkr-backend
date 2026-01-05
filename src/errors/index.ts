import httpStatus from "http-status";

export function badRequest(message: string) {
  return {
    name: "BadRequestError",
    message,
    status: httpStatus.BAD_REQUEST
  };
}

export function conflict(message: string) {
  return {
    name: "ConflictError",
    message,
    status: httpStatus.CONFLICT
  };
}

export function notFound(message: string) {
  return {
    name: "NotFoundError",
    message,
    status: httpStatus.NOT_FOUND
  };
}
