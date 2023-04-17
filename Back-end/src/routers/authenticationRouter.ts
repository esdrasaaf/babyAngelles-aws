import { signInPost, signUpPost } from "../controllers/authController";
import { validateBody } from "../middlewares/authSchemaValidation";
import { loginSchema } from "../schemas/signIn-schema";
import { createUserSchema } from "../schemas/signUp-schema";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter
  .post("/sign-up", validateBody(createUserSchema), signUpPost)
  .post("/sign-in", validateBody(loginSchema), signInPost)

export { authenticationRouter };