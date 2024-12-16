import prisma from "../config/prisma.config";
import {
  CreateMunicipality,
  UpdateMunicipality,
} from "../types/municipality.types";
import { hashPassword } from "../utilities/hashPassword";
import cloudinary from "../config/cloudinary.config";
import { extractPublicId } from "../utilities/extractPublicId";

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
      include: { beaches: true },
    });
  }

  static async createMunicipality(
    data: CreateMunicipality,
    fileBuffer?: Express.Multer.File["buffer"],
  ) {
    const municipalityWithSameEmail = await this.getMunicipalityByEmail(
      data.email,
    );

    if (municipalityWithSameEmail) {
      throw new Error("Email already in use");
    }

    const hashedPassword: string = await hashPassword(data.password);

    const newMunicipality = await prisma.municipality.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    if (fileBuffer) {
      return await this.uploadMunicipalityImage(newMunicipality.id, fileBuffer);
    }

    return newMunicipality;
  }

  static async updateMunicipality(
    id: string,
    data: UpdateMunicipality,
    fileBuffer?: Express.Multer.File["buffer"],
  ) {
    const municipality = await prisma.municipality.findUnique({
      where: { id },
    });

    if (!municipality) {
      throw new Error("No se encontró la municipalidad");
    }

    const updatedMunicipality = await prisma.municipality.update({
      where: {
        id,
      },
      data,
    });

    if (fileBuffer) {
      return await this.uploadMunicipalityImage(
        updatedMunicipality.id,
        fileBuffer,
      );
    }

    return updatedMunicipality;
  }

  static async uploadMunicipalityImage(id: string, fileBuffer: Buffer) {
    const municipality = await prisma.municipality.findUnique({
      where: { id },
    });

    if (!municipality) {
      throw new Error("No se encontró la municipalidad");
    }

    if (municipality.image) {
      const publicId = extractPublicId(municipality.image);
      await cloudinary.uploader.destroy(publicId);
    }

    const uploadStream = cloudinary.uploader.upload_stream;

    const result: any = await new Promise((resolve, reject) => {
      const stream = uploadStream(
        { folder: `playas_app/municipality/${id}` },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      stream.end(fileBuffer);
    });

    return prisma.municipality.update({
      where: {
        id,
      },
      data: {
        image: result.secure_url,
      },
    });
  }

  static async deleteMunicipality(id: string) {
    const municipality = await prisma.municipality.findUnique({
      where: { id },
    });

    if (!municipality) {
      throw new Error("No se encontró la municipalidad");
    }

    if (municipality.image) {
      const publicId = extractPublicId(municipality.image);
      await cloudinary.uploader.destroy(publicId);
    }

    return prisma.municipality.delete({
      where: {
        id,
      },
    });
  }
}
