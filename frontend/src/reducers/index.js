import { combineReducers } from "redux";
import ProductListReducer from "./productReducer";
import productDetailReducer from "./productDetailReducer";
import { cartReducer } from "./cartReducer";
import { userLoginReducer, userRegisterReducer } from "./userReducer";

export default combineReducers({
    productList: ProductListReducer,
    productDetails: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
})