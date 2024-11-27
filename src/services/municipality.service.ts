import prisma from "../config/prisma.config";
import {
  CreateMunicipality,
  UpdateMunicipality,
} from "../types/municipality.types";

export class MunicipalityService {
  async getMunicipalities() {
    return prisma.municipality.findMany();
  }

  async getMunicipalityById(id: string) {
    return prisma.municipality.findUnique({
      where: {
        id,
      },
    });
  }

  async getMunicipalityByEmail(email: string) {
    return prisma.municipality.findUnique({
      where: {
        email,
      },
    });
  }

  async createMunicipality(data: CreateMunicipality) {
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

  async updateMunicipality(id: string, data: UpdateMunicipality) {
    return prisma.municipality.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteMunicipality(id: string) {
    return prisma.municipality.delete({
      where: {
        id,
      },
    });
  }
}
