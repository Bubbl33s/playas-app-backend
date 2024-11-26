import prisma from "../config/prisma.config";

export class RestrictionService {
  static async getRestrictions() {
    return await prisma.restriction.findMany();
  }

  static async getRestriction(id: string) {
    return await prisma.restriction.findUnique({
      where: { id },
    });
  }
}
