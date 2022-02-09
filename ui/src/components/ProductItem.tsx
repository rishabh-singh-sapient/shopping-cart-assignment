import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddToCart } from "../actions/actions";
import useHttp from "../hooks/useHttp";
import { CartModel } from "../models/CartModel";

import { ProductModel } from "../models/ProductModel";
import Success from "./Success";

export default function ProductItem(props: ProductModel) {
  const { fetchData: sendData } = useHttp();
  const [popUp, setPopUp] = useState("");
  const dispatch = useDispatch();
  const { id, name, description, price, stock, imageURL } = props;

  const cartHandler = (data: CartModel, { response, responseMessage }: any) => {
    if (response === "Success") {
      dispatch(AddToCart(data));
      setPopUp(`${responseMessage}`);
      setTimeout(() => setPopUp(""), 1000);
    }
    console.log(response, responseMessage);
  };

  const onAddToCartHandler = (product: CartModel) => {
    const reqConfig = {
      keyword: "addToCart",
      method: "POST",
      body: { ...product },
    };
    sendData(reqConfig, cartHandler.bind(null, product));
  };

  return (
    <div className="col-md-3 col-sm-6 p-1">
      <div className="card" id={id}>
        {popUp !== "" && <Success message={popUp} />}
        <header
          className="card-header bg-white mt-2 border-0 text-center"
          tabIndex={0}
        >
          <h6 className="card-title" style={{ height: "30px" }}>
            <strong>{name}</strong>
          </h6>
        </header>
        <div className="card-body">
          <img
            src={imageURL}
            className="card-img-top"
            height="150px"
            width="150px"
            alt={name}
          />
          <p
            className="card-text alert alert-info my-2 overflow-scroll w-100"
            style={{ height: "100px" }}
          >
            <small>{description}</small>
          </p>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <p className="card-text m-2" tabIndex={0}>
              <strong>{`MRP Rs. ${price}`}</strong>
            </p>
            <button
              className="btn btn-danger"
              onClick={() =>
                onAddToCartHandler({
                  id,
                  name,
                  price,
                  imageURL,
                  stock,
                  quantity: 1,
                })
              }
            >
              <strong>Buy Now</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
