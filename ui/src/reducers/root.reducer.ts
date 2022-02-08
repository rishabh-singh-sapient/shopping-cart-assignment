import { combineReducers } from "redux";
import cart from "./cart.reducer";
import products from "./products.reducer";

const rootReducer = combineReducers({ products, cart });

export default rootReducer;
