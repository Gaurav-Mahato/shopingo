import { combineReducers } from "redux";
import {productListReducer, productDeleteReducer, productTopRatedReducer} from "./productReducer";
import {productCreateReviewReducer, productDetailsReducer, productUpdateReducer} from "./productDetailReducer";
import { cartReducer } from "./cartReducer";
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userProfileUpdateReducer, userListReducer, userDeleteReducer, userUpdateReducer } from "./userReducer";
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderMyListReducer, orderPayReducer } from "./orderReducer";

export default combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userProfileUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyList: orderMyListReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productDelete: productDeleteReducer,
    productUpdate: productUpdateReducer,
    productCreateReview: productCreateReviewReducer,
    productTopRated: productTopRatedReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer
})