import { confirmPurchase, deletePurchase, getUserPurchaseProducts, postPurchase, putNumberOfSales } from "../controllers/paymentController";
import { authenticateToken } from "../middlewares/authenticationMiddleware";
import { Router } from "express";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("/", getUserPurchaseProducts)
  .post("/", postPurchase)
  .put("/confirm/:purchaseId", confirmPurchase)
  .put("/numberofsales/:purchaseId", putNumberOfSales)
  .delete("/cancel/:purchaseId", deletePurchase)
 
export { paymentRouter };