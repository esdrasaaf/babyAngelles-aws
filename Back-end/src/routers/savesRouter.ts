import { getSavedProducts, postSave } from "../controllers/savesController";
import { authenticateToken } from "../middlewares/authenticationMiddleware";
import { Router } from "express";

const savesRouters = Router();

savesRouters
  .all("/*", authenticateToken)
  .get("/", getSavedProducts)
  .post("/", postSave)
 
export { savesRouters };