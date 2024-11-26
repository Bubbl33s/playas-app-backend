import { Application } from "express";
import reestrictionRoutes from "./restriction.routes";

export default function setupRoutes(app: Application) {
  app.get("/", (_, res) => {
    res.send("Hello World");
  });

  const API_PREFIX = "/api";

  app.use(`${API_PREFIX}/restrictions`, reestrictionRoutes);
}
