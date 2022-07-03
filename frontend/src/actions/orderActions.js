import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAILURE, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAILURE, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAILURE } from "./types"
import axios from 'axios'

export const createOrder = (order) => async(dispatch, getState) => {
    const {userLogin : {userInfo}} = getState()
    try{
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
        const config = {
            headers:{
                'Content-Type': "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(`http://localhost:8080/api/orders`,order,config)
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })      
    }
    catch(error){
        dispatch({type: ORDER_CREATE_FAILURE, payload: error.message});
    }
}

export const getOrderDetails = (id) => async(dispatch, getState) => {
    const {userLogin : {userInfo}} = getState()
    try{
        dispatch({type: ORDER_DETAILS_REQUEST})
        const config = {
            headers:{
                'Content-Type': "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`http://localhost:8080/api/orders/${id}`,config)
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({type: ORDER_DETAILS_FAILURE, payload: error.message});
    }
}

export const payOrder = (orderID) => async(dispatch, getState) => {
    const {userLogin : {userInfo}} = getState()
    try{
        dispatch({type: ORDER_PAY_REQUEST})
        const config = {
            headers:{
                'Content-Type': "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`http://localhost:8080/api/orders/${orderID}/pay`,config)
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({type: ORDER_PAY_FAILURE, payload: error.message});
    }
}