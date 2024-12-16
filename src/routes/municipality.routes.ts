import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { MunicipalityController } from "../controller/municipality.controller";
import {
  authenticateToken,
  authorizeRoles,
  validateData,
  upload,
} from "../middlewares";
import {
  createMunicipalityValidation,
  updateMunicipalityValidation,
} from "../validations";

const router = Router();

router.get("/", MunicipalityController.getMunicipalities);

router.get("/:id", MunicipalityController.getMunicipalityById);

router.get("/email/:email", MunicipalityController.getMunicipalityByEmail);

router.post(
  "/",
  authenticateToken,
  authorizeRoles(["admin"]),
  validateData(createMunicipalityValidation),
  upload.single("file"),
  MunicipalityController.createMunicipality,
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(["admin", "municipality"]),
  validateData(updateMunicipalityValidation),
  upload.single("file"),
  MunicipalityController.updateMunicipality,
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  MunicipalityController.deleteMunicipality,
);

router.post("/login", AuthController.municipalityLogin);

export default router;
