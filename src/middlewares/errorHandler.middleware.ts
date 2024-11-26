import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  } else {
    return res.status(500).json({ error: "Internal server error" });
  }
}
