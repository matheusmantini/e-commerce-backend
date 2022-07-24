import { Request, Response } from "express";
import { ProductInputDTO } from "../business/entities/Product";
import { CustomError } from "../business/error/CustomError";
import { ProductBusiness } from "../business/ProductBusiness";
import { IdGenerator } from "../business/services/IdGenerator";
import { ProductDatabase } from "../data/ProductDatabase";

const productBusiness = new ProductBusiness(
  new IdGenerator(),
  new ProductDatabase()
);

export class ProductController {
  async createProduct(req: Request, res: Response) {
    try {
      const input: ProductInputDTO = {
        name: req.body.name,
        price: req.body.price,
        image_url: req.body.image_url,
      };

      await productBusiness.createProduct(input);
      
      res.status(200).send("Produto cadastrado com sucesso!");
    } catch (error) {
      throw new CustomError(500, "An unexpected error ocurred");
    }
  }
}
