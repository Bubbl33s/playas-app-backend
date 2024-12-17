import cloudinary from "../config/cloudinary.config";
import prisma from "../config/prisma.config";
import { Beach } from "../types/beach.types";
import { Restriction } from "../types/restriction.types";
import { extractPublicId } from "../utilities/extractPublicId";

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
    fileBuffer?: Express.Multer.File["buffer"],
  ) {
    return prisma.$transaction(async (tx) => {
      const newBeach = await tx.beach.create({
        data: {
          ...data,
          municipalityId,
        },
        include: { restrictions: true },
      });

      if (restrictions?.length) {
        await tx.restriction.createMany({
          data: restrictions.map((restriction) => ({
            ...restriction,
            beachId: newBeach.id,
          })),
        });
      }

      if (fileBuffer) {
        return await this.uploadBeachImage(newBeach.id, fileBuffer);
      }

      return newBeach;
    });
  }

  static async updateBeach(
    id: string,
    data: Beach,
    restrictions: Restriction[],
    fileBuffer?: Express.Multer.File["buffer"],
  ) {
    // Realiza la transacción sin la carga de la imagen
    const updatedBeach = await prisma.$transaction(async (tx) => {
      const beach = await tx.beach.findUnique({ where: { id } });

      if (!beach) {
        throw new Error("No se encontró la playa");
      }

      const updatedBeach = await tx.beach.update({
        where: { id },
        data,
        include: { restrictions: true },
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

    if (fileBuffer) {
      return await this.uploadBeachImage(updatedBeach.id, fileBuffer);
    }

    return updatedBeach;
  }

  static async uploadBeachImage(id: string, fileBuffer: Buffer) {
    const beach = await prisma.beach.findUnique({
      where: { id },
    });

    if (!beach) {
      throw new Error("No se encontró la playa");
    }

    if (beach.image) {
      const publicId = extractPublicId(beach.image);
      await cloudinary.uploader.destroy(publicId);
    }

    const uploadStream = cloudinary.uploader.upload_stream;

    const result: any = await new Promise((resolve, reject) => {
      const stream = uploadStream(
        { folder: `playas_app/beaches/${beach.municipalityId}` },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      stream.end(fileBuffer);
    });

    return prisma.beach.update({
      where: {
        id,
      },
      data: {
        image: result.secure_url,
      },
      include: { restrictions: true },
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
      include: { restrictions: true },
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
      include: { restrictions: true },
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

      if (beach.image) {
        const publicId = extractPublicId(beach.image);
        await cloudinary.uploader.destroy(publicId);
      }

      // Eliminar la playa
      return await tx.beach.delete({
        where: { id },
      });
    });
  }
}
