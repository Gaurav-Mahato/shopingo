import axios from "axios";
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAILURE, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_FAILURE, PRODUCT_UPDATE_SUCCESS, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAILURE } from "./types";


export const listProducts = (keyword='',pageNumber='') => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_LIST_REQUEST});
        const {data} = await axios.get(`http://localhost:8080/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
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

export const deleteProduct = (id) => async(dispatch,getState) => {
    const {userLogin: {userInfo}} = getState()
    try{
        dispatch({type: PRODUCT_DELETE_REQUEST})
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`http://localhost:8080/api/products/${id}`,config)
        dispatch({type: PRODUCT_DELETE_SUCCESS})
    }catch(err){
        dispatch({type: PRODUCT_DELETE_FAILURE, payload: err})
    }
}

export const updateProduct = (product) => async(dispatch,getState) => {
    const {userLogin: {userInfo}} = getState()
    try{
        dispatch({type: PRODUCT_UPDATE_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`http://localhost:8080/api/products/${product._id}`,product,config) 
        dispatch({type: PRODUCT_UPDATE_SUCCESS, payload: data})   
    }catch(err){
        dispatch({type: PRODUCT_UPDATE_FAILURE, payload: err})
    }
}

export const createReview = (id,review) => async(dispatch,getState) => {
    try{
        const {userLogin: {userInfo}} = getState()
        dispatch({type: PRODUCT_CREATE_REVIEW_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.post(`http://localhost:8080/api/products/${id}/review`,review,config) 
        dispatch({type: PRODUCT_CREATE_REVIEW_SUCCESS})   
    }catch(err){
        dispatch({type: PRODUCT_CREATE_REVIEW_FAILURE, payload: err})
    }
}
