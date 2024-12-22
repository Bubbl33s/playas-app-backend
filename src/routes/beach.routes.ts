import { Router } from "express";
import { BeachController } from "../controller/beach.controller";
import {
  authenticateToken,
  authorizeRoles,
  validateData,
  upload,
  parseMultipartFormData,
} from "../middlewares";
import { createBeachValidation, updateBeachValidation } from "../validations";

const router = Router();

router.get("/", BeachController.getBeaches);

router.get("/filters/filter", BeachController.getBeachesByFilters);

router.get("/:id", BeachController.getBeach);

router.get(
  "/municipality/:municipalityId",
  BeachController.getBeachesByMunicipality,
);

router.post(
  "/municipality/:municipalityId",
  authenticateToken,
  authorizeRoles(["admin", "municipality"]),
  upload.single("file"),
  parseMultipartFormData,
  validateData(createBeachValidation),
  parseMultipartFormData,
  BeachController.createBeach,
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(["admin", "municipality"]),
  upload.single("file"),
  parseMultipartFormData,
  validateData(updateBeachValidation),
  BeachController.updateBeach,
);

router.patch(
  "/:id/tideStatus",
  authenticateToken,
  authorizeRoles(["admin", "municipality"]),
  BeachController.updateTideStatus,
);

router.patch(
  "/:id/activate",
  authenticateToken,
  authorizeRoles(["admin", "municipality"]),
  BeachController.activateBeach,
);

router.patch(
  "/:id/deactivate",
  authenticateToken,
  authorizeRoles(["admin", "municipality"]),
  BeachController.deactivateBeach,
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(["admin", "municipality"]),
  BeachController.deleteBeach,
);

export default router;
