export type UpdateMunicipality = {
  name: string;
  description?: string;
  phrase?: string;
  image?: string;
};

export type CreateMunicipality = UpdateMunicipality & {
  email: string;
  password: string;
  province: string;
  department: string;
};
