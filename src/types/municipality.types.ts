export type UpdateMunicipality = {
  name: string;
  description?: string;
  phrase?: string;
  fileBuffer?: Express.Multer.File["buffer"];
};

export type CreateMunicipality = UpdateMunicipality & {
  email: string;
  password: string;
  province: string;
  department: string;
};
