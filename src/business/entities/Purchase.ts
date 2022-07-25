export class Purchase {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly productId: string,
    public readonly quantity: number,
    public readonly totalPrice: number
  ) {}
}

export interface PurchaseInputDTO {
  user_id: string;
  product_id: string;
  quantity: number;
  total_price: number;
}
