import { BaseDatabase } from "./BaseDatabase";
import { User } from "../business/entities/User";

export class UserDatabase extends BaseDatabase {
  private static TABLE_USER = "ecom_users";
  private static TABLE_USER_ADDRESS = "ecom_user_address";

  private static toUserModel(user: any): User {
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      User.stringToUserRole(user.role),
      user.cpf
    );
  }

  public async createUser(
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    cpf: string
  ): Promise<void> {
    try {
      await BaseDatabase.connection
        .insert({
          id,
          name,
          email,
          password,
          role,
          cpf,
        })
        .into(UserDatabase.TABLE_USER);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    try {
      const result = await BaseDatabase.connection
        .select("*")
        .from(UserDatabase.TABLE_USER)
        .where({ email });

      return UserDatabase.toUserModel(result[0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async insertAddress(
    id: string,
    cep: string,
    logradouro: string,
    numero: number,
    complemento: string,
    bairro: string,
    cidade: string,
    estado: string,
    user_id: string
  ): Promise<void> {
    try {
      await BaseDatabase.connection
        .insert({
          id,
          cep,
          logradouro,
          numero,
          complemento,
          bairro,
          cidade,
          estado,
          user_id,
        })
        .into(UserDatabase.TABLE_USER_ADDRESS);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
