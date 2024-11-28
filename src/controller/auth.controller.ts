import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async municipalityLogin(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email, password } = req.body;
      const { token, municipality } = await AuthService.municipalityLogin(
        email,
        password,
      );

      res.json({ token, municipality });
    } catch (error) {
      next(error);
    }
  }
}
