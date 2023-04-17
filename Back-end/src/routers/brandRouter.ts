import { getAllBrands } from "../controllers/brandController";
import { Router } from "express";

const brandRouter = Router();

brandRouter
  .get("/", getAllBrands)

export { brandRouter };