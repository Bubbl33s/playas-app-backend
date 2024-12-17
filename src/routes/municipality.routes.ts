import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { MunicipalityController } from "../controller/municipality.controller";
import {
  authenticateToken,
  authorizeRoles,
  validateData,
  upload,
  parseMultipartFormData,
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
  upload.single("file"),
  parseMultipartFormData,
  validateData(createMunicipalityValidation),
  MunicipalityController.createMunicipality,
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(["admin", "municipality"]),
  upload.single("file"),
  parseMultipartFormData,
  validateData(updateMunicipalityValidation),
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
