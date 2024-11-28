import prisma from "../config/prisma.config";
import {
  CreateMunicipality,
  UpdateMunicipality,
} from "../types/municipality.types";
import { hashPassword } from "../utilities/hashPassword";

export class MunicipalityService {
  static async getMunicipalities() {
    return prisma.municipality.findMany({ include: { beaches: true } });
  }

  static async getMunicipalityById(id: string) {
    return prisma.municipality.findUnique({
      where: {
        id,
      },
      include: { beaches: true },
    });
  }

  static async getMunicipalityByEmail(email: string) {
    return prisma.municipality.findUnique({
      where: {
        email,
      },
    });
  }

  static async createMunicipality(data: CreateMunicipality) {
    const municipalityWithSameEmail = await this.getMunicipalityByEmail(
      data.email,
    );

    if (municipalityWithSameEmail) {
      throw new Error("Email already in use");
    }

    const hashedPassword: string = await hashPassword(data.password);

    return prisma.municipality.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  // TODO: Add image upload

  static async updateMunicipality(id: string, data: UpdateMunicipality) {
    const municipality = await prisma.municipality.findUnique({
      where: { id },
    });

    if (!municipality) {
      throw new Error("No se encontró la municipalidad");
    }

    return prisma.municipality.update({
      where: {
        id,
      },
      data,
    });
  }

  static async deleteMunicipality(id: string) {
    const municipality = await prisma.municipality.findUnique({
      where: { id },
    });

    if (!municipality) {
      throw new Error("No se encontró la municipalidad");
    }

    return prisma.municipality.delete({
      where: {
        id,
      },
    });
  }
}
