import Joi from "joi";
import { SignUpParams } from "../protocols/authenticationParams";

export const createUserSchema = Joi.object<SignUpParams>({
    name: Joi.string().required(),
    image: Joi.string().allow('').uri(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });
  