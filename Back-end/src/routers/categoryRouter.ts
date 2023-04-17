import { getAllCategories } from "../controllers/categoryController";
import { Router } from "express";

const categoryRouter = Router();

categoryRouter
  .get("/", getAllCategories)

export { categoryRouter };