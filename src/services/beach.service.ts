import prisma from "../config/prisma.config";
import { Beach } from "../types/beach.types";
import { Restriction } from "../types/restriction.types";

export class BeachService {
  static async getBeaches() {
    return prisma.beach.findMany({
      include: { restrictions: true },
    });
  }

  static async getBeach(id: string) {
    return prisma.beach.findUnique({
      where: { id },
      include: { restrictions: true },
    });
  }

  static async getBeachesByMunicipality(municipalityId: string) {
    return prisma.beach.findMany({
      where: { municipalityId },
      include: { restrictions: true },
    });
  }

  static async createBeach(
    municipalityId: string,
    data: Beach,
    restrictions: Restriction[],
  ) {
    return prisma.$transaction(async (tx) => {
      const newBeach = await tx.beach.create({
        data: {
          ...data,
          municipalityId,
        },
      });

      if (restrictions?.length) {
        await tx.restriction.createMany({
          data: restrictions.map((restriction) => ({
            ...restriction,
            beachId: newBeach.id,
          })),
        });
      }

      return newBeach;
    });
  }

  // TODO: Implementar metodo para cargar imagenes de playa

  static async updateBeach(
    id: string,
    data: Beach,
    restrictions: Restriction[],
  ) {
    return prisma.$transaction(async (tx) => {
      const beach = await tx.beach.findUnique({ where: { id } });

      if (!beach) {
        throw new Error("No se encontró la playa");
      }

      const updatedBeach = await tx.beach.update({
        where: { id },
        data,
      });

      if (restrictions?.length) {
        await tx.restriction.deleteMany({ where: { beachId: id } });
        await tx.restriction.createMany({
          data: restrictions.map((restriction) => ({
            ...restriction,
            beachId: id,
          })),
        });
      }

      return updatedBeach;
    });
  }

  static async activateBeach(id: string) {
    const beach = await prisma.beach.findUnique({ where: { id } });

    if (!beach) {
      throw new Error("No se encontró la playa");
    }

    return prisma.beach.update({
      where: { id },
      data: { isActive: true },
    });
  }

  static async deactivateBeach(id: string) {
    const beach = await prisma.beach.findUnique({ where: { id } });

    if (!beach) {
      throw new Error("No se encontró la playa");
    }

    return prisma.beach.update({
      where: { id },
      data: { isActive: false },
    });
  }

  static async deleteBeach(id: string) {
    const beach = await prisma.beach.findUnique({ where: { id } });

    if (!beach) {
      throw new Error("No se encontró la playa");
    }

    return await prisma.$transaction(async (tx) => {
      // Eliminar asociaciones de tablas relacionadas
      await tx.restriction.deleteMany({
        where: { beachId: id },
      });

      // Eliminar la playa
      return await tx.beach.delete({
        where: { id },
      });
    });
  }
}
