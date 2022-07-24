import { BaseDatabase } from "./BaseDatabase";
import { Product } from "../business/entities/Product";

export class ProductDatabase extends BaseDatabase {
  private static TABLE_PRODUCTS = "ecom_products";

  public async createProduct(
    id: string,
    name: string,
    price: number,
    image_url: string
  ): Promise<void> {
    try {
      await BaseDatabase.connection
        .insert({
          id,
          name,
          price,
          image_url,
        })
        .into(ProductDatabase.TABLE_PRODUCTS);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}