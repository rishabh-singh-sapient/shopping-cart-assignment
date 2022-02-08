import { ICartActions } from "../interfaces/ICartActions";
import { CartModel } from "../models/CartModel";

export default function cart(
  storeData: CartModel[] = [],
  actions: ICartActions
): CartModel[] {
  switch (actions.type) {
    case "ADD_TO_CART": {
      const pIndex = storeData.findIndex(
        (c: CartModel) => c.id === actions.product.id
      );
      if (pIndex < 0) {
        return [...storeData, actions.product];
      } else if (
        pIndex > -1 &&
        storeData[pIndex].quantity === actions.product.stock
      ) {
        return storeData;
      }
      return [
        ...storeData.slice(0, pIndex),
        {
          ...storeData[pIndex],
          quantity: storeData[pIndex].quantity + 1,
        },
        ...storeData.slice(pIndex + 1),
      ];
    }
    case "REMOVE_FROM_CART": {
      const pIndex = storeData.findIndex(
        (c: CartModel) => c.id === actions.product.id
      );
      if (pIndex > -1 && storeData[pIndex].quantity === 1) {
        const filterProducts = storeData.filter(
          (p: CartModel) => p.id !== actions.product.id
        );

        return filterProducts;
      }
      return [
        ...storeData.slice(0, pIndex),
        { ...storeData[pIndex], quantity: storeData[pIndex].quantity - 1 },
        ...storeData.slice(pIndex + 1),
      ];
    }
    default:
      return storeData;
  }
}
