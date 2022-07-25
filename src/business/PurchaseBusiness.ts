import { PurchaseDatabase } from "../data/PurchaseDatabase";
import { PurchaseInputDTO } from "./entities/Purchase";
import { IdGenerator } from "./services/IdGenerator";

export class PurchaseBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private purchaseDatabase: PurchaseDatabase
  ) {}

  async createPurchase(purchase: PurchaseInputDTO) {
    const id = this.idGenerator.generate();

    await this.purchaseDatabase.insertPurchase(
      id,
      purchase.user_id,
      purchase.product_id,
      purchase.quantity,
      purchase.total_price
    );
  }
}

