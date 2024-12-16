import { NextFunction, Request, Response } from "express";

export const parseMultipartFormData = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        try {
          req.body[key] = JSON.parse(req.body[key]);
        } catch {}
      }
    }
  }
  next();
};
