export type UpdateMunicipality = {
  name?: string;
  description?: string;
};

export type CreateMunicipality = {
  email: string;
  password: string;
  name: string;
  description?: string;
  district: string;
  province: string;
  department: string;
};
