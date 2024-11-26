import express from "express";
import setupExpress from "./express.config";
import { errorHandler } from "../middlewares";
import setupRoutes from "../routes";

const app = express();
setupExpress(app);
setupRoutes(app);
app.use(errorHandler);

export default app;
