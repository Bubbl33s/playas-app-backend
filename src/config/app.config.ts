import express from "express";
import setupExpress from "./express.config";

const app = express();
setupExpress(app);

export default app;
