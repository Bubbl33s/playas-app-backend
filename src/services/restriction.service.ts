import prisma from "../config/prisma.config";
import { Restriction } from "../types/restriction.types";

export class RestrictionService {
  static async getRestrictions() {
    return await prisma.restriction.findMany();
  }

  static async getRestriction(id: string) {
    return await prisma.restriction.findUnique({
      where: { id },
    });
  }

  static async createRestriction(data: Restriction) {
    return await prisma.restriction.create({
      data,
    });
  }

  static async updateRestriction(id: string, data: Restriction) {
    const restriction = await prisma.restriction.findUnique({ where: { id } });

    if (!restriction) {
      throw new Error("No se encontró la restricción");
    }

    return await prisma.restriction.update({
      where: { id },
      data,
    });
  }
  static async deleteRestriction(id: string) {
    const restriction = await prisma.restriction.findUnique({ where: { id } });

    if (!restriction) {
      throw new Error("No se encontró la restricción");
    }

    return await prisma.$transaction(async (prisma) => {
      await prisma.beachRestriction.deleteMany({
        where: { restrictionId: id },
      });

      return await prisma.restriction.delete({
        where: { id },
      });
    });
  }
}
