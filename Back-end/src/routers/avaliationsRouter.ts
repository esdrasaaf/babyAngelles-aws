import { deleteAvaliations, getAvaliations, getUserAvaliations, postAvaliations, putAvaliations } from "../controllers/avaliationsController";
import { authenticateToken } from "../middlewares/authenticationMiddleware";
import { Router } from "express";

const avaliationsRouter = Router();

avaliationsRouter
  .all("/*", authenticateToken)
  .get("/product/:productId", getAvaliations)
  .get("/user", getUserAvaliations)
  .post("/", postAvaliations)
  .put("/", putAvaliations)
  .delete("/:avaliationId", deleteAvaliations)
 
export { avaliationsRouter };