import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Acceso denegado, token no proporcionado" });
    return;
  }

  try {
    const decoded = AuthService.verifyToken(token);

    req.body.auth = decoded;

    next();
  } catch (error) {
    res.status(403).json({ error: "Token inválido o expirado" });
  }
};
