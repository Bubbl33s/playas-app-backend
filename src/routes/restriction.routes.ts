import { Router } from "express";
import { RestrictionController } from "../controller/restriction.controller";
import {
  authenticateToken,
  authorizeRoles,
  validateData,
} from "../middlewares";
import { restrictionValidation } from "../validations";

const router = Router();

router.get("/", RestrictionController.getRestrictions);

router.get("/:id", RestrictionController.getRestriction);

router.post(
  "/:beachId",
  authenticateToken,
  authorizeRoles(["admin"]),
  validateData(restrictionValidation),
  RestrictionController.createRestriction,
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  validateData(restrictionValidation),
  RestrictionController.updateRestriction,
);

export default router;
