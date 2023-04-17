import { ApplicationError } from "../protocols/applicationErrors";

export function unauthorizedError(): ApplicationError {
  return {
    name: "UnauthorizedError",
    message: "You must be signed in to continue",
    status: 401
  };
}
