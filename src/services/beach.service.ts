import prisma from "../config/prisma.config";
import { Beach } from "../types/beach.types";

export class BeachService {
  static async getBeaches() {
    return prisma.beach.findMany({
      include: { restrictions: true, photos: true },
    });
  }

  static async getBeach(id: string) {
    return prisma.beach.findUnique({
      where: { id },
      include: { restrictions: true, photos: true },
    });
  }

  static async getBeachesByMunicipality(municipalityId: string) {
    return prisma.beach.findMany({
      where: { municipalityId },
      include: { restrictions: true, photos: true },
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
    restrictions: { id: string; notes?: string }[],
  ) {
    const beach = await prisma.beach.findUnique({ where: { id } });

    if (!beach) {
      throw new Error("No se encontró la playa");
    }

    return await prisma.$transaction(async (tx) => {
      // 1. Obtener las restricciones actuales de la playa
      const existingRestrictions = await tx.beachRestriction.findMany({
        where: { id },
      });

      // 2. Extraer los IDs de las restricciones nuevas y existentes
      const newRestrictionIds = restrictions.map((r) => r.id);
      const existingRestrictionIds = existingRestrictions.map(
        (r) => r.restrictionId,
      );

      // 3. Determinar restricciones a eliminar
      const restrictionsToRemove = existingRestrictions.filter(
        (r) => !newRestrictionIds.includes(r.restrictionId),
      );

      // 4. Determinar restricciones a agregar
      const restrictionsToAdd = restrictions.filter(
        (r) => !existingRestrictionIds.includes(r.id),
      );

      // 5. Eliminar restricciones obsoletas
      if (restrictionsToRemove.length > 0) {
        await tx.beachRestriction.deleteMany({
          where: {
            id: { in: restrictionsToRemove.map((r) => r.id) },
          },
        });
      }

      // 6. Agregar restricciones nuevas
      if (restrictionsToAdd.length > 0) {
        await tx.beachRestriction.createMany({
          data: restrictionsToAdd.map((r) => ({
            beachId: id,
            restrictionId: r.id,
            notes: r.notes || null,
          })),
        });
      }

      // 7. Actualizar notas de restricciones existentes
      const restrictionsToUpdate = restrictions.filter((r) =>
        existingRestrictionIds.includes(r.id),
      );

      for (const restriction of restrictionsToUpdate) {
        await tx.beachRestriction.updateMany({
          where: {
            beachId: id,
            restrictionId: restriction.id,
          },
          data: { notes: restriction.notes || null },
        });
      }

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

  static async deleteBeach(id: string) {
    const beach = await prisma.beach.findUnique({ where: { id } });

    if (!beach) {
      throw new Error("No se encontró la playa");
    }

    return await prisma.$transaction(async (tx) => {
      // Eliminar asociaciones de tablas relacionadas
      await tx.beachRestriction.deleteMany({
        where: { beachId: id },
      });

      // Eliminar la playa
      return await tx.beach.delete({
        where: { id },
      });
    });
  }
}
