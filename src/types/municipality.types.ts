export type UpdateMunicipality = {
  name: string;
  description: string;
};

export type CreateMunicipality = UpdateMunicipality & {
  email: string;
  password: string;
  district: string;
  province: string;
  department: string;
};
