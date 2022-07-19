export type authenticationData = {
  id: string;
  role?: string;
};

export type Address = {
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
};