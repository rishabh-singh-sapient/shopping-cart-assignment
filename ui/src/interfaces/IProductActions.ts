import { ProductModel } from "../models/ProductModel";

export interface IProductActions {
  type: string;
  products: ProductModel[];
}
