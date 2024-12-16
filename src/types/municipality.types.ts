export type UpdateMunicipality = {
  name?: string;
  description?: string;
  phrase?: string;
  province?: string;
  department?: string;
  fileBuffer?: Express.Multer.File["buffer"];
};

export type CreateMunicipality = {
  name: string;
  email: string;
  password: string;
  description?: string;
  phrase?: string;
  province: string;
  department: string;
};
