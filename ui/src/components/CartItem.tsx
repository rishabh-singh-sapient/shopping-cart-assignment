import React from "react";
import { useDispatch } from "react-redux";
import { AddToCart, RemoveFromCart } from "../actions/actions";
import { CartModel } from "../models/CartModel";

interface ICartItems {
  cart: CartModel[];
  onClose: () => void;
}

export default function CartItem(props: ICartItems) {
  const { cart } = props;
  const dispatch = useDispatch();

  const cartProductsList = cart.map((c: CartModel, index: number) => {
    return (
      <li
        key={c.id}
        className="list-group-item my-2 border-1 rounded-0 d-flex"
        aria-label={`${c.name}, has ${c.quantity} quantity in cart`}
        tabIndex={index + 3}
      >
        <img src={c.imageURL} height={`60px`} width={`60px`} alt={c.id} />
        <div className="row">
          <strong className="card-title" tabIndex={0}>
            {c.name}
          </strong>
          <p>
            <button
              className="bi bi-dash-circle-fill text-danger bg-white border-0"
              aria-label={`minus quantity`}
              onClick={() => dispatch(RemoveFromCart(c))}
            ></button>
            <span className="mx-2">{c.quantity}</span>
            <button
              className="bi bi-plus-circle-fill text-danger bg-white border-0"
              aria-label={`plus quantity`}
              onClick={() => dispatch(AddToCart(c))}
            ></button>
            <small className="mx-3">{`X Rs.${c.price}`}</small>
          </p>
          <strong className="text-end" tabIndex={0}>{`Rs.${
            c.price * c.quantity
          }`}</strong>
        </div>
      </li>
    );
  });

  const cartBox = cart.reduce(
    (box: { items: number; total: number }, c: CartModel) => {
      box.items += c.quantity;
      box.total += c.price * c.quantity;
      return box;
    },
    { items: 0, total: 0 }
  );

  return (
    <section
      className="card rounded-0 border-0 m-0 bg-light d-flex flex-column justify-content-between cart-card"
      role="alert"
    >
      <header className="card-header d-flex flex-row justify-content-between rounded-0 bg-dark text-white">
        <h5 tabIndex={2}>
          <strong>My Cart</strong>
          <small>{` (${cartBox.items} ${
            cartBox.items > 1 ? "items" : "item"
          })`}</small>
        </h5>
        <button
          className="bi bi-x-lg border-0 bg-dark text-white"
          aria-label="Close Cart"
          onClick={props.onClose}
          tabIndex={1}
          autoFocus
        ></button>
      </header>
      <ul className="card-body list-group py-2 p-0 m-0 bg-light overflow-scroll mh-75">
        {cartProductsList.length > 0 ? (
          cartProductsList
        ) : (
          <div className="d-flex flex-column justify-content-center h-100 align-items-center">
            <h5>
              <strong>No items in your cart</strong>
            </h5>
            <span>Your favourite items are just a click away</span>
          </div>
        )}
      </ul>
      {cartProductsList.length > 0 && (
        <aside className="list-group-item m-2 rounded-0">
          <img
            src={`/static/images/lowest-price.png`}
            height={`30px`}
            alt={`lowest price`}
          />
          <small className="mx-2">You won't find it cheaper anywhere</small>
        </aside>
      )}
      <footer className="card-footer text-center bg-white border-top">
        {cartProductsList.length > 0 ? (
          <>
            <small>Promo code can be applied on payment page</small>
            <button
              className="btn btn-danger d-flex justify-content-between w-100"
              onClick={props.onClose}
            >
              <span>Proceed to Checkout</span>
              <span>
                {`Rs. ${cartBox.total} `}
                <i className="bi bi-chevron-compact-right"></i>
              </span>
            </button>
          </>
        ) : (
          <button
            className="btn btn-danger d-flex justify-content-center w-100"
            onClick={props.onClose}
          >
            Start Shopping
          </button>
        )}
      </footer>
    </section>
  );
}
