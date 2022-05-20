import { combineReducers } from "redux";
import productListReducer from "./productReducer";
import productDetailsReducer from "./productDetailReducer";
import { cartReducer } from "./cartReducer";
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userProfileUpdateReducer } from "./userReducer";
import { orderCreateReducer, orderDetailsReducer } from "./orderReducer";

export default combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userProfileUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer
})