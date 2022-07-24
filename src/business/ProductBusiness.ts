import { ProductDatabase } from "../data/ProductDatabase";
import { ProductInputDTO } from "./entities/Product";
import { IdGenerator } from "./services/IdGenerator";

export class ProductBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private productDatabase: ProductDatabase
  ) {}

  async createProduct(product: ProductInputDTO) {
    const id = this.idGenerator.generate();

    await this.productDatabase.createProduct(
      id,
      product.name,
      product.price,
      product.image_url
    );
  }
}
