import { deleteAllCart, deleteProductOfCart, getUserCart, postProductOnCart } from "../controllers/cartController";
import { authenticateToken } from "../middlewares/authenticationMiddleware";
import { Router } from "express";

const cartRouter = Router();

cartRouter
  .all("/*", authenticateToken)
  .get("/", getUserCart)
  .post("/", postProductOnCart)
  .delete("/:cartId", deleteProductOfCart)
  .delete("/clear/all", deleteAllCart)

export { cartRouter };