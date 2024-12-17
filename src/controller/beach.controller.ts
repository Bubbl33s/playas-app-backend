import { Request, Response, NextFunction } from "express";
import { BeachService } from "../services/beach.service";

export class BeachController {
  static async getBeaches(_: Request, res: Response, next: NextFunction) {
    try {
      const beaches = await BeachService.getBeaches();

      if (!beaches) {
        throw new Error("No se encontraron playas");
      }

      res.json(beaches);
    } catch (error) {
      next(error);
    }
  }

  static async getBeach(req: Request, res: Response, next: NextFunction) {
    try {
      const beach = await BeachService.getBeach(req.params.id);

      if (!beach) {
        throw new Error("No se encontró la playa");
      }

      res.json(beach);
    } catch (error) {
      next(error);
    }
  }

  static async getBeachesByMunicipality(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const beaches = await BeachService.getBeachesByMunicipality(
        req.params.municipalityId,
      );

      if (!beaches) {
        throw new Error("No se encontraron playas para esta municipalidad");
      }

      res.json(beaches);
    } catch (error) {
      next(error);
    }
  }

  static async createBeach(req: Request, res: Response, next: NextFunction) {
    try {
      const { file, restrictions, ...beachData } = req.body;

      const beach = await BeachService.createBeach(
        req.params.municipalityId,
        beachData,
        restrictions,
        req.file?.buffer,
      );

      res.json(beach);
    } catch (error) {
      next(error);
    }
  }

  static async updateBeach(req: Request, res: Response, next: NextFunction) {
    try {
      const beachId = req.params.id;
      const { file, restrictions, ...beachData } = req.body;

      const updatedBeach = await BeachService.updateBeach(
        beachId,
        beachData,
        restrictions,
        req.file?.buffer,
      );

      res.json(updatedBeach);
    } catch (error) {
      next(error);
    }
  }

  static async updateTideStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const beachId = req.params.id;
      const { tideStatus } = req.body;

      const beach = await BeachService.updateTideStatus(beachId, tideStatus);

      res.json(beach);
    } catch (error) {
      next(error);
    }
  }

  static async activateBeach(req: Request, res: Response, next: NextFunction) {
    try {
      const beachId = req.params.id;
      const beach = await BeachService.activateBeach(beachId);

      res.json(beach);
    } catch (error) {
      next(error);
    }
  }

  static async deactivateBeach(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const beachId = req.params.id;
      const beach = await BeachService.deactivateBeach(beachId);

      res.json(beach);
    } catch (error) {
      next(error);
    }
  }

  static async deleteBeach(req: Request, res: Response, next: NextFunction) {
    try {
      const beachId = req.params.id;
      await BeachService.deleteBeach(beachId);

      res.json({ message: "Playa eliminada correctamente" });
    } catch (error) {
      next(error);
    }
  }
}
