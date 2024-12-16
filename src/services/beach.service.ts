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

  static async createBeach(municipalityId: string, data: Beach) {
    return prisma.beach.create({
      data: {
        ...data,
        municipalityId,
      },
    });
  }

  static async updateBeachRestrictions(
    id: string,
    restrictions: Restriction[],
  ) {
    const beach = await prisma.beach.findUnique({ where: { id } });

    if (!beach) {
      throw new Error("No se encontró la playa");
    }

    return await prisma.$transaction(async (tx) => {
      // Eliminar restricciones actuales
      await tx.restriction.deleteMany({
        where: { beachId: id },
      });

      // Crear restricciones nuevas
      await tx.restriction.createMany({
        data: restrictions.map((restriction) => ({
          ...restriction,
          beachId: id,
        })),
      });

      // Finalizar transacción
      return { message: "Restricciones actualizadas correctamente" };
    });
  }

  // TODO: Implementar metodo para cargar imagenes de playa

  static async updateBeach(id: string, data: Beach) {
    const beach = await prisma.beach.findUnique({ where: { id } });

    if (!beach) {
      throw new Error("No se encontró la playa");
    }

    return prisma.beach.update({
      where: { id },
      data,
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
