import { Request, Response, NextFunction } from "express";
import { RestrictionService } from "../services/restriction.service";

export class RestrictionController {
  static async getRestrictions(_: Request, res: Response, next: NextFunction) {
    try {
      const restrictions = await RestrictionService.getRestrictions();

      if (!restrictions) {
        throw new Error("No se encontraron restricciones");
      }

      res.json(restrictions);
    } catch (error) {
      next();
    }
  }

  static async getRestriction(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const restriction = await RestrictionService.getRestriction(id);

      if (!restriction) {
        throw new Error("No se encontró la restricción");
      }

      res.json(restriction);
    } catch (error) {
      next();
    }
  }

  static async createRestriction(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { beachId } = req.params;
      const restriction = await RestrictionService.createRestriction(
        beachId,
        req.body,
      );

      res.json(restriction);
    } catch (error) {
      next();
    }
  }

  static async updateRestriction(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const restriction = await RestrictionService.updateRestriction(
        id,
        req.body,
      );

      res.json(restriction);
    } catch (error) {
      next();
    }
  }
}
