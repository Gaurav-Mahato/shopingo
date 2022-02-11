import { combineReducers } from "redux";
import ProductListReducer from "./productReducer";
import productDetailReducer from "./productDetailReducer";

export default combineReducers({
    productList: ProductListReducer,
    productDetails: productDetailReducer
})