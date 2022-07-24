
export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly image_url: string,
  ) {}

}

export interface ProductInputDTO {
  name: string;
  price: number;
  image_url: string;
}