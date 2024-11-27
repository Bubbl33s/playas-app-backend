import jwt from "jsonwebtoken";
import { comparePassword } from "../utilities/hashPassword";
import { MunicipalityService } from "./municipality.service";

export class AuthService {
  static secretKey = process.env.JWT_SECRET_KEY as string;

  static async municipalityLogin(email: string, password: string) {
    if (!this.secretKey) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }

    const municipality =
      await MunicipalityService.getMunicipalityByEmail(email);

    if (!municipality) {
      throw new Error("Municipalidad no encontrada");
    }

    const isPasswordValid = await comparePassword(
      password,
      municipality.password,
    );

    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign(
      { id: municipality.id, role: "muni" },
      this.secretKey,
      {
        expiresIn: "2h",
      },
    );

    return { token, municipality };
  }

  static async verifyToken(token: string) {
    if (!this.secretKey) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }

    try {
      const decoded = jwt.verify(token, this.secretKey);

      return decoded;
    } catch (error) {
      throw new Error("Token inválido");
    }
  }
}
