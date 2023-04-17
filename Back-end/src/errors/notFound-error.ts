import { ApplicationError } from "../protocols/applicationErrors";

export function notFoundError(): ApplicationError {
    return {
      name: "NotFoundError",
      message: "No result for this search!",
      status: 404
    };
  }
  