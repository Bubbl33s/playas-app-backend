import { z } from "zod";

export const updateMunicipalityValidation = z.object({
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
    .optional(),

  phrase: z
    .string({
      invalid_type_error: "La frase debe ser de tipo string",
    })
    .min(3, "La frase debe tener al menos 3 caracteres")
    .max(50, "La frase debe tener como máximo 255 caracteres")
    .optional(),
});

export const createMunicipalityValidation = z.object({
  email: z
    .string({
      required_error: "El email es requerido",
      invalid_type_error: "El email debe ser de tipo string",
    })
    .email("El email debe ser un email válido"),

  password: z
    .string({
      required_error: "La contraseña es requerida",
      invalid_type_error: "La contraseña debe ser una cadena de texto",
    })
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    })
    .max(25, {
      message: "La contraseña debe tener como máximo 25 caracteres",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message:
        "La contraseña debe tener al menos una letra minúscula, una letra mayúscula y un número",
    }),

  name: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser de tipo string",
    })
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre debe tener como máximo 100 caracteres"),

  description: z
    .string({
      invalid_type_error: "La descripción debe ser de tipo string",
    })
    .min(3, "La descripción debe tener al menos 3 caracteres")
    .optional(),

  phrase: z
    .string({
      invalid_type_error: "La frase debe ser de tipo string",
    })
    .min(3, "La frase debe tener al menos 3 caracteres")
    .max(50, "La frase debe tener como máximo 255 caracteres")
    .optional(),

  province: z.string({
    required_error: "La provincia es requerida",
    invalid_type_error: "La provincia debe ser de tipo string",
  }),

  department: z.string({
    required_error: "El departamento es requerido",
    invalid_type_error: "El departamento debe ser de tipo string",
  }),
});
