export type Address = {
  id: string;
  cep: string;
  logradouro: string;
  numero: number;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  user_id: string;
};
