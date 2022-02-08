import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IStoreData } from "../interfaces/IStoreData";
import Backdrop from "../Layouts/Backdrop";
import { CartModel } from "../models/CartModel";
import CartItem from "./CartItem";

export default function Cart() {
  const [isCart, setIsCart] = useState<boolean>(false);
  const cart = useSelector((state: IStoreData) => state.cart);

  const cartItem = cart.reduce((items: number, c: CartModel) => {
    items += c.quantity;
    return items;
  }, 0);
  return (
    <>
      <button
        className="border-0 border-info p-2 border-bottom-0 cart-button"
        data-toggle="cart-card"
        data-target="#cart-modal"
        onClick={() => setIsCart(true)}
      >
        <strong className="d-flex flex-row align-items-center">
          <img
            src={`/static/images/cart.svg`}
            height="40"
            width="40"
            alt="cart-icon"
          />
          <span>{`${cartItem} ${cartItem > 1 ? "items" : "item"}`}</span>
        </strong>
      </button>
      {isCart && (
        <Backdrop>
          <CartItem onClose={() => setIsCart(false)} cart={cart} />
        </Backdrop>
      )}
    </>
  );
}
