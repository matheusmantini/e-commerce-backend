import {
  UserInputDTO,
  LoginInputDTO,
  UserAddressInputDTO,
} from "./entities/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "./services/IdGenerator";
import { HashManager } from "./services/HashManager";
import { Authenticator } from "./services/Authenticator";
import { CustomError } from "./error/CustomError";

export class UserBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator,
    private userDatabase: UserDatabase
  ) {}

  async createUser(user: UserInputDTO) {
    const id = this.idGenerator.generate();

    const hashPassword = await this.hashManager.hash(user.password);

    await this.userDatabase.createUser(
      id,
      user.name,
      user.email,
      hashPassword,
      user.role,
      user.cpf
    );
    
    const userFromDB = await this.userDatabase.getUserByEmail(user.email);

    if (user.cpf === userFromDB.cpf || user.email === userFromDB.email){
      throw new CustomError(400, "Já existe um usuário cadastrado com o cpf ou email informado!");
    }

      const accessToken = this.authenticator.generateToken({
        id,
        role: user.role,
      });

    return accessToken;
  }

  async getUserByEmail(user: LoginInputDTO) {
    const userFromDB = await this.userDatabase.getUserByEmail(user.email);

    const passwordIsCorrect = await this.hashManager.compare(
      user.password,
      userFromDB.password
    );

    const accessToken = this.authenticator.generateToken({
      id: userFromDB.id,
      role: userFromDB.role,
    });

    if (!passwordIsCorrect) {
      throw new CustomError(401, "Invalid credentials!");
    }

    return accessToken;
  }

  async insertAddress(userAddress: UserAddressInputDTO, email: string) {
    const id = this.idGenerator.generate();

    const userFromDB = await this.userDatabase.getUserByEmail(email);

    await this.userDatabase.insertAddress(
      id,
      userAddress.cep,
      userAddress.logradouro,
      Number(userAddress.numero),
      userAddress.complemento as string,
      userAddress.bairro,
      userAddress.cidade,
      userAddress.estado,
      userFromDB.id
    );
  }
}
