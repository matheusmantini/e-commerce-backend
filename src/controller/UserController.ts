import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO } from "../business/entities/User";
import { CustomError } from "../business/error/CustomError";
import { Authenticator } from "../business/services/Authenticator";
import { HashManager } from "../business/services/HashManager";
import { IdGenerator } from "../business/services/IdGenerator";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";
import { GetFullAddress } from "../services/GetFullAddress";

const userBusiness = new UserBusiness(
  new IdGenerator(),
  new HashManager(),
  new Authenticator(),
  new UserDatabase()
);

export class UserController {
  async signup(req: Request, res: Response) {
    try {
      const input: UserInputDTO = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        role: req.body.role,
        cpf: req.body.cpf,
      };

      const token = await userBusiness.createUser(input);

      res.status(200).send({ token });
    } catch (err) {
      console.log(err);
      /* if (err instanceof Error) {
        res.status(400).send({ message: err.message });
      }
      return; */
      /* throw new CustomError(500, "An unexpected error ocurred"); */
    }
  }

  async login(req: Request, res: Response) {
    try {
      const loginData: LoginInputDTO = {
        email: req.body.email,
        password: req.body.password,
      };

      const token = await userBusiness.getUserByEmail(loginData);

      res.status(200).send({ token });
    } catch (error) {
      throw new CustomError(500, "An unexpected error ocurred");
    }
  }

  async getAddress(req: Request, res: Response) {
    try {
      const { cep } = req.params;

      const address = await GetFullAddress(cep);

      if (!address) {
        res.statusCode = 404;
        throw new Error("Address not found");
      }

      const addressInfo = {
        cep: address.cep,
        logradouro: address.logradouro,
        bairro: address.bairro,
        cidade: address.localidade,
        estado: address.uf,
      };

      res.status(200).send(addressInfo);
    } catch (error) {
      throw new CustomError(500, "An unexpected error ocurred");
    }
  }

  async createAddress(req: Request, res: Response) {
    try {
      const { cep, numero, complemento, userEmail } = req.body;

      const address = await GetFullAddress(cep);

      if (!address) {
        res.statusCode = 404;
        throw new Error("Address not found");
      }

      if (cep === address.cep.replace("-", "")) {
        res.statusCode = 400;
        throw new Error("CEP informed is already used by this user");
      }

      const addressInfos = {
        cep,
        logradouro: address.logradouro,
        numero,
        complemento,
        bairro: address.bairro,
        cidade: address.localidade,
        estado: address.uf,
      };

      await userBusiness.insertAddress(addressInfos, userEmail);

      res.status(201).send({ message: "Address created with success" });
    } catch (err) {
      if (err instanceof Error) {
        res.status(res.statusCode).send({ message: err.message });
      }
    }
  }
}
