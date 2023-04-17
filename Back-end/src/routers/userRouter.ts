import { getUserData, putUserData, logoutUser } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authenticationMiddleware";
import { Router } from "express";

const userRouters = Router();

userRouters
  .all("/*", authenticateToken)
  .get("/", getUserData)
  .put("/", putUserData)
  .delete("/", logoutUser)
 
export { userRouters };