import Joi from "joi";
import { SignInParams } from "../protocols/authenticationParams";

export const loginSchema = Joi.object<SignInParams>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});