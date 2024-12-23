import { Application } from "express";
import restrictionRoutes from "./restriction.routes";
import municipalityRoutes from "./municipality.routes";
import beachRoutes from "./beach.routes";

export default function setupRoutes(app: Application) {
  app.get("/", (_, res) => {
    res.send("Hello World");
  });

  const API_PREFIX = "/api";

  app.use(`${API_PREFIX}/restrictions`, restrictionRoutes);
  app.use(`${API_PREFIX}/municipalities`, municipalityRoutes);
  app.use(`${API_PREFIX}/beaches`, beachRoutes);
}
