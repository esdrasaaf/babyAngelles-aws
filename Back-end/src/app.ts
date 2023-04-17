import express, { Express } from "express";
import cors from "cors";

import { loadEnv } from "./config/envs";
import { connectDb, disconnectDB } from "./config/database";

loadEnv();

import { authenticationRouter } from "./routers/authenticationRouter";
import { categoryRouter } from "./routers/categoryRouter";
import { brandRouter } from "./routers/brandRouter";
import { colorRouter } from "./routers/colorRouter";
import { promotionImagesRouter } from "./routers/promotionImagesRoutes";
import { productsRouters } from "./routers/productRouters";
import { browsingHistoryRouter } from "./routers/browsingHistoryRouter";
import { cartRouter } from "./routers/cartRouter";
import { savesRouters } from "./routers/savesRouter";
import { userRouters } from "./routers/userRouter";
import { avaliationsRouter } from "./routers/avaliationsRouter";
import { paymentRouter } from "./routers/paymentRouter";

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/auth", authenticationRouter)
  .use("/categories", categoryRouter)
  .use("/brands", brandRouter)
  .use("/colors", colorRouter)
  .use("/promos", promotionImagesRouter)
  .use("/products", productsRouters)
  .use("/browsingHistory", browsingHistoryRouter)
  .use("/cart", cartRouter)
  .use("/saves", savesRouters)
  .use("/user", userRouters)
  .use("/avaliations", avaliationsRouter)
  .use("/payment", paymentRouter)

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
}
  
export async function close(): Promise<void> {
    await disconnectDB();
}
  
export default app;
  