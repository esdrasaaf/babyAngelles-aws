import { getAllColors } from "../controllers/colorsController";
import { Router } from "express";

const colorRouter = Router();

colorRouter
  .get("/", getAllColors)

export { colorRouter };