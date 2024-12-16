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

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  RestrictionController.deleteRestriction,
);

export default router;
