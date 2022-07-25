import { BaseDatabase } from "./BaseDatabase";

export class PurchaseDatabase extends BaseDatabase {
  private static TABLE_PURCHASES = "ecom_purchases";

  public async insertPurchase(
    id: string,
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
  ): Promise<void> {

    try {
      await BaseDatabase.connection
        .insert({
          id,
          user_id: userId,
          product_id: productId,
          quantity,
          total_price: totalPrice,
        })
        .into(PurchaseDatabase.TABLE_PURCHASES);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
