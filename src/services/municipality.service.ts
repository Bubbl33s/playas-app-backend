import prisma from "../config/prisma.config";
import {
  CreateMunicipality,
  UpdateMunicipality,
} from "../types/municipality.types";

export class MunicipalityService {
  static async getMunicipalities() {
    return prisma.municipality.findMany();
  }

  static async getMunicipalityById(id: string) {
    return prisma.municipality.findUnique({
      where: {
        id,
      },
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

    return prisma.municipality.create({
      data,
    });
  }

  // TODO: Add image upload

  static async updateMunicipality(id: string, data: UpdateMunicipality) {
    return prisma.municipality.update({
      where: {
        id,
      },
      data,
    });
  }

  static async deleteMunicipality(id: string) {
    return prisma.municipality.delete({
      where: {
        id,
      },
    });
  }
}
