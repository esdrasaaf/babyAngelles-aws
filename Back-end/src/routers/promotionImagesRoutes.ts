import { getAllPromotionImages } from "../controllers/promotionImagesController";
import { Router } from "express";

const promotionImagesRouter = Router();

promotionImagesRouter
  .get("/", getAllPromotionImages)

export { promotionImagesRouter };