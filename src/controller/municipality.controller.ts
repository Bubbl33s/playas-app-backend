import { Request, Response, NextFunction } from "express";
import { MunicipalityService } from "../services/municipality.service";

export class MunicipalityController {
  static async getMunicipalities(
    _: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const municipalities = await MunicipalityService.getMunicipalities();

      if (!municipalities) {
        throw new Error("No se encontraron municipalidades");
      }

      res.json(municipalities);
    } catch (error) {
      next(error);
    }
  }

  static async getMunicipalitiesByFilters(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { department, province } = req.query;
    try {
      const municipalities =
        await MunicipalityService.getMunicipalitiesByFilters(
          String(department),
          String(province),
        );

      if (!municipalities) {
        throw new Error("No se encontraron municipalidades");
      }

      res.json(municipalities);
    } catch (error) {
      next(error);
    }
  }

  static async getMunicipalityById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const municipality = await MunicipalityService.getMunicipalityById(id);

      if (!municipality) {
        throw new Error("No se encontró la municipalidad");
      }

      res.json(municipality);
    } catch (error) {
      next(error);
    }
  }

  static async getMunicipalityByEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email } = req.params;
      const municipality =
        await MunicipalityService.getMunicipalityByEmail(email);

      if (!municipality) {
        throw new Error("No se encontró la municipalidad");
      }

      res.json(municipality);
    } catch (error) {
      next(error);
    }
  }

  static async createMunicipality(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { file, ...municipalityData } = req.body;

      const municipality = await MunicipalityService.createMunicipality(
        municipalityData,
        req.file?.buffer,
      );

      res.json(municipality);
    } catch (error) {
      next(error);
    }
  }

  static async updateMunicipality(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const { file, ...municipalityData } = req.body;

      const municipality = await MunicipalityService.updateMunicipality(
        id,
        municipalityData,
        req.file?.buffer,
      );

      res.json(municipality);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMunicipality(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      await MunicipalityService.deleteMunicipality(id);

      res.json({ message: "Municipalidad eliminada correctamente" });
    } catch (error) {
      next(error);
    }
  }
}
