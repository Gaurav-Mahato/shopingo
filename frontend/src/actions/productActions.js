import axios from "axios";
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL } from "./types";


export const listProducts = () => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_LIST_REQUEST});
        const {data} = await axios.get("http://localhost:8080/api/products");
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    }
    catch(err){
        dispatch({type: PRODUCT_LIST_FAIL, payload: err.message});
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_DETAIL_REQUEST});
        const {data} = await axios.get(`http://localhost:8080/api/products/${id}`);
        dispatch({type: PRODUCT_DETAIL_SUCCESS, payload: data})
    }
    catch(err){
        dispatch({type: PRODUCT_DETAIL_FAIL, payload: err.message});
    }
}