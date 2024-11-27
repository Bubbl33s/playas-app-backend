import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export default function validateData(schema: z.ZodType<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));

        res.status(400).json({ errors: formattedErrors });
        return;
      }

      res.status(500).send("Internal Server Error");
    }
  };
}
