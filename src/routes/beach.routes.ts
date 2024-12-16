import { Router } from "express";
import { BeachController } from "../controller/beach.controller";
import {
  authenticateToken,
  authorizeRoles,
  validateData,
} from "../middlewares";
import { createBeachValidation, updateBeachValidation } from "../validations";

const router = Router();

router.get("/", BeachController.getBeaches);
router.get("/:id", BeachController.getBeach);
router.get(
  "/municipality/:municipalityId",
  BeachController.getBeachesByMunicipality,
);
router.post(
  "/",
  authenticateToken,
  authorizeRoles(["admin", "municipality"]),
  validateData(createBeachValidation),
  BeachController.createBeach,
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(["admin", "municipality"]),
  validateData(updateBeachValidation),
  BeachController.updateBeach,
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(["admin", "municipality"]),
  BeachController.deleteBeach,
);

export default router;
