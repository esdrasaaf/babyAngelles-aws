import { getHistoricNavigation, postHistoric, deleteHistoric } from "../controllers/browsingHistoryController";
import { authenticateToken } from "../middlewares/authenticationMiddleware";
import { Router } from "express";

const browsingHistoryRouter = Router();

browsingHistoryRouter
  .all("/*", authenticateToken)
  .get("/", getHistoricNavigation)
  .post("/", postHistoric)
  .delete("/:historicId", deleteHistoric)
 
export { browsingHistoryRouter };