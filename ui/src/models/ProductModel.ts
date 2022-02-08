export class ProductModel {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public category: string,
    public imageURL: string,
    public description?: string,
    public stock?: number,
    public sku?: string
  ) {}
}
