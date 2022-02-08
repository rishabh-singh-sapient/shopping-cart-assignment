import { CartModel } from "../models/CartModel";
import { ProductModel } from "../models/ProductModel";

export function StoreProducts(products: ProductModel[]) {
  return {
    type: "STORE_PRODUCTS",
    products,
  };
}

export function AddToCart(product: CartModel) {
  return {
    type: "ADD_TO_CART",
    product,
  };
}

export function RemoveFromCart(product: CartModel) {
  return {
    type: "REMOVE_FROM_CART",
    product,
  };
}

export function FilterProducts(productId: string) {
  return {
    type: "FILTER_PRODUCTS",
    productId,
  };
}
