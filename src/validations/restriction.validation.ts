import { z } from "zod";

export const restrictionValidation = z.object({
  beachId: z
    .string({
      required_error: "El id de la playa es requerido",
      invalid_type_error: "El id de la playa debe ser de tipo string",
    })
    .cuid("El id de la playa debe ser un CUID válido"),

  name: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser de tipo string",
    })
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(255, "El nombre debe tener como máximo 255 caracteres"),

  description: z
    .string({
      invalid_type_error: "La descripción debe ser de tipo string",
    })
    .min(3, "La descripción debe tener al menos 3 caracteres")
    .max(255, "La descripción debe tener como máximo 255 caracteres")
    .optional(),
});
