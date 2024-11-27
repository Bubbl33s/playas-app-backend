import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

export const authorizeRoles = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Token no proporcionado" });
      return;
    }

    try {
      const decodedToken = await AuthService.verifyToken(token);

      if (typeof decodedToken !== "object" || !decodedToken.role) {
        res.status(400).json({ message: "Token inválido o mal formado" });
        return;
      }

      const role = decodedToken.role as string;

      if (!roles.includes(role)) {
        res
          .status(403)
          .json({ message: "No tienes permisos para realizar esta acción" });
        return;
      }

      next();
    } catch (error) {
      res.status(400).json({ message: "Token inválido o expirado" });
      return;
    }
  };
};
