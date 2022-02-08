import { IProductActions } from "../interfaces/IProductActions";
import { ProductModel } from "../models/ProductModel";

export default function products(
  storeData: ProductModel[] = [],
  actions: IProductActions
): ProductModel[] {
  switch (actions.type) {
    case "STORE_PRODUCTS":
      return actions.products;

    default:
      return storeData;
  }
}
