import { combineReducers } from "redux";
import ProductListReducer from "./productReducer";
import productDetailReducer from "./productDetailReducer";
import { cartReducer } from "./cartReducer";

export default combineReducers({
    productList: ProductListReducer,
    productDetails: productDetailReducer,
    cart: cartReducer
})