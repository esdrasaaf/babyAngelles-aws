import { 
  getAllProducts, 
  getBestSellersProducts, 
  getProductByBrand, 
  getProductByCategory, 
  getProductByColor, 
  getProductById, 
  getReleaseProducts, 
  getSearchProducts 
} from "../controllers/productsController";
import { authenticateToken } from "../middlewares/authenticationMiddleware";
import { Router } from "express";

const productsRouters = Router();

productsRouters
  .all("/*", authenticateToken)
  .post("/", getAllProducts)
  .get("/review/:productId", getProductById)
  .get("/search/:productName", getSearchProducts)
  .get("/categories/:categoryId", getProductByCategory)
  .get("/colors/:colorId", getProductByColor)
  .get("/brands/:brandId", getProductByBrand)
  .get("/releases", getReleaseProducts)
  .get("/bestsellers", getBestSellersProducts)
 
export { productsRouters };