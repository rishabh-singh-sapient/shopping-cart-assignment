export class CartModel {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public imageURL: string,
    public quantity: number,
    public category?: string,
    public stock?: number
  ) {}
}
