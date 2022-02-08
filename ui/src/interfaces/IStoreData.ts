import { CartModel } from "../models/CartModel";
import { CategoryModel } from "../models/CategoryModel";
import { ProductModel } from "../models/ProductModel";

export interface IStoreData {
  categories: CategoryModel[];
  products: ProductModel[];
  cart: CartModel[];
}
