import { z } from "zod";
import { restrictionValidation } from "./restriction.validation";

export const createBeachValidation = z.object({
  name: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser de tipo string",
    })
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre debe tener como máximo 100 caracteres"),

  description: z
    .string({
      required_error: "La descripción es requerida",
      invalid_type_error: "La descripción debe ser de tipo string",
    })
    .min(3, "La descripción debe tener al menos 3 caracteres")
    .max(255, "La descripción debe tener como máximo 255 caracteres"),

  latitude: z
    .number({
      required_error: "La latitud es requerida",
      invalid_type_error: "La latitud debe ser de tipo numérico",
    })
    .min(-90, "La latitud debe ser mayor a -90")
    .max(90, "La latitud debe ser menor a 90"),

  longitude: z
    .number({
      required_error: "La longitud es requerida",
      invalid_type_error: "La longitud debe ser de tipo numérico",
    })
    .min(-180, "La longitud debe ser mayor a -180")
    .max(180, "La longitud debe ser menor a 180"),

  isHealthy: z
    .boolean({
      invalid_type_error: "El estado de salud debe ser de tipo boolean",
    })
    .default(true),

  tideStatus: z.string({
    required_error: "El estado de la marea es requerido",
    invalid_type_error: "El estado de la marea debe ser de tipo string",
  }), // TODO: ENUM

  hasLifeguards: z
    .boolean({
      invalid_type_error: "La presencia de salvavidas debe ser de tipo boolean",
    })
    .default(false),

  lifeguardSchedule: z
    .string({
      invalid_type_error: "El horario de salvavidas debe ser de tipo string",
    })
    .max(50, "El horario de salvavidas debe tener como máximo 50 caracteres")
    .optional(),

  hasRestrooms: z
    .boolean({
      invalid_type_error: "La presencia de baños debe ser de tipo boolean",
    })
    .default(false),

  restroomSchedule: z
    .string({
      invalid_type_error: "El horario de baños debe ser de tipo string",
    })
    .max(50, "El horario de baños debe tener como máximo 50 caracteres")
    .optional(),

  hasShowers: z
    .boolean({
      invalid_type_error: "La presencia de duchas debe ser de tipo boolean",
    })
    .default(false),

  showerSchedule: z
    .string({
      invalid_type_error: "El horario de duchas debe ser de tipo string",
    })
    .max(50, "El horario de duchas debe tener como máximo 50 caracteres")
    .optional(),

  restrictions: z.array(restrictionValidation).optional(),
});

export const updateBeachValidation = z.object({
  name: z
    .string({
      invalid_type_error: "El nombre debe ser de tipo string",
    })
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre debe tener como máximo 100 caracteres")
    .optional(),

  description: z
    .string({
      invalid_type_error: "La descripción debe ser de tipo string",
    })
    .min(3, "La descripción debe tener al menos 3 caracteres")
    .max(255, "La descripción debe tener como máximo 255 caracteres")
    .optional(),

  latitude: z
    .number({
      invalid_type_error: "La latitud debe ser de tipo numérico",
    })
    .min(-90, "La latitud debe ser mayor a -90")
    .max(90, "La latitud debe ser menor a 90")
    .optional(),

  longitude: z
    .number({
      invalid_type_error: "La longitud debe ser de tipo numérico",
    })
    .min(-180, "La longitud debe ser mayor a -180")
    .max(180, "La longitud debe ser menor a 180")
    .optional(),

  isHealthy: z
    .boolean({
      invalid_type_error: "El estado de salud debe ser de tipo boolean",
    })
    .optional(),

  tideStatus: z
    .string({
      invalid_type_error: "El estado de la marea debe ser de tipo string",
    }) // TODO: ENUM
    .optional(),

  hasLifeguards: z
    .boolean({
      invalid_type_error: "La presencia de salvavidas debe ser de tipo boolean",
    })
    .default(false),

  lifeguardSchedule: z
    .string({
      invalid_type_error: "El horario de salvavidas debe ser de tipo string",
    })
    .max(50, "El horario de salvavidas debe tener como máximo 50 caracteres")
    .optional(),

  hasRestrooms: z
    .boolean({
      invalid_type_error: "La presencia de baños debe ser de tipo boolean",
    })
    .default(false),

  restroomSchedule: z
    .string({
      invalid_type_error: "El horario de baños debe ser de tipo string",
    })
    .max(50, "El horario de baños debe tener como máximo 50 caracteres")
    .optional(),

  hasShowers: z
    .boolean({
      invalid_type_error: "La presencia de duchas debe ser de tipo boolean",
    })
    .default(false),

  showerSchedule: z
    .string({
      invalid_type_error: "El horario de duchas debe ser de tipo string",
    })
    .max(50, "El horario de duchas debe tener como máximo 50 caracteres")
    .optional(),

  restrictions: z.array(restrictionValidation).optional(),
});
