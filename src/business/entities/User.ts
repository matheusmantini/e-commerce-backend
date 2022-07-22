import { CustomError } from "../error/CustomError";

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: UserRole
  ) { }


  static stringToUserRole(input: string): UserRole {
    switch (input) {
        case "NORMAL":
          return UserRole.NORMAL;
        case "ADMIN":
          return UserRole.ADMIN;
        default:
          throw new CustomError(422,"Invalid user role");
    }
  }
}

export interface UserInputDTO {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UserAddressInputDTO {
  cep: string;
  logradouro: string;
  numero: number;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface UserAddressDTO {
  cep: string;
  numero: number;
  complemento?: string;
  userEmail: string
}

export interface LoginInputDTO {
  email: string;
  password: string;
}

export enum UserRole {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN"
}

export interface AuthenticationData {
  id: string;
  role?: string;
}