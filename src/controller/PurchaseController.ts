import { Request, Response } from "express";
import { PurchaseInputDTO } from "../business/entities/Purchase";
import { CustomError } from "../business/error/CustomError";
import { PurchaseBusiness } from "../business/PurchaseBusiness";
import { IdGenerator } from "../business/services/IdGenerator";
import { PurchaseDatabase } from "../data/PurchaseDatabase";

const purchaseBusiness = new PurchaseBusiness(
  new IdGenerator(),
  new PurchaseDatabase()
);

export class PurchaseController {
  async createPurchase(req: Request, res: Response) {
    try {
      const input: PurchaseInputDTO = {
        user_id: req.body.user_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity,
        total_price: req.body.total_price,
      };

      await purchaseBusiness.createPurchase(input);

      res.status(200).send("Compra cadastrada com sucesso!");
    } catch (error) {
      throw new CustomError(500, "An unexpected error ocurred");
    }
  }
}
