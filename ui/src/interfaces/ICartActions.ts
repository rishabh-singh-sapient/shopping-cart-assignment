import { CartModel } from "../models/CartModel";

export interface ICartActions {
  type: string;
  product: CartModel;
}
