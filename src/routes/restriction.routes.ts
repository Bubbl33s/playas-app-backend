import { Router } from "express";
import { RestrictionController } from "../controller/restriction.controller";
import { validateData } from "../middlewares";
import { restrictionValidation } from "../validations";

const router = Router();

router.get("/", RestrictionController.getRestrictions);
router.get("/:id", RestrictionController.getRestriction);
router.post(
  "/",
  validateData(restrictionValidation),
  RestrictionController.createRestriction,
);
router.put(
  "/:id",
  validateData(restrictionValidation),
  RestrictionController.updateRestriction,
);
router.delete("/:id", RestrictionController.deleteRestriction);

export default router;
