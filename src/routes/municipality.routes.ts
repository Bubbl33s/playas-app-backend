import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { MunicipalityController } from "../controller/municipality.controller";
import {
  authenticateToken,
  authorizeRoles,
  validateData,
} from "../middlewares";
