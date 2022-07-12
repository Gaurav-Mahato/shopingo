import axios from 'axios';
import { USER_LOGIN_FAILURE,USER_LOGIN_SUCCESS,USER_LOGIN_REQUEST,USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAILURE, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAILURE, USER_UPDATE_PROFILE_RESET, USER_DETAILS_RESET, ORDER_MY_LIST_RESET, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_RESET, USER_DELETE_REQUEST, USER_LIST_FAILURE, USER_DELETE_SUCCESS, USER_DELETE_FAILURE, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAILURE } from './types';

export const login = (email,password) => async(dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            'Content-Type': "application/json",
        }
        const {data} = await axios.post('https://mighty-savannah-06065.herokuapp.com/api/users/login',{email,password},config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem("userInfo",JSON.stringify(data))
    }
    catch(error){
        dispatch({type: USER_LOGIN_FAILURE, payload: error.message});
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: ORDER_MY_LIST_RESET})
    dispatch({type: USER_LIST_RESET})
}

export const register = (name, email,password) => async(dispatch) => {
    try{
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const config = {
            'Content-Type': "application/json",
        }
        const {data} = await axios.post('https://mighty-savannah-06065.herokuapp.com/api/users',{name,email,password},config)
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem("userInfo",JSON.stringify(data))
    }
    catch(error){
        dispatch({type: USER_REGISTER_FAILURE, payload: error.message});
    }
}

export const getUserDetails = (id) => async(dispatch, getState) => {
    const {userLogin : {userInfo}} = getState()
    try{
        dispatch({
            type: USER_DETAILS_REQUEST
        })
        const config = {
            headers:{
                'Content-Type': "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`https://mighty-savannah-06065.herokuapp.com/api/users/${id}`,config)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({type: USER_DETAILS_FAILURE, payload: error.message});
    }
}

export const userUpdateProfile = (user) => async(dispatch, getState) => {
    const {userLogin : {userInfo}} = getState()
    try{
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })
        const config = {
            headers:{
                'Content-Type': "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`https://mighty-savannah-06065.herokuapp.com/api/users/profile`,user,config)
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem("userInfo", JSON.stringify(data))
    }
    catch(error){
        dispatch({type: USER_UPDATE_PROFILE_FAILURE, payload: error.message});
    }
}

export const listUsers = () => async(dispatch,getState) => {
    const {userLogin:{userInfo}} = getState()
    try{
        dispatch({type: USER_LIST_REQUEST})
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get('https://mighty-savannah-06065.herokuapp.com/api/users',config)
        dispatch({type: USER_LIST_SUCCESS, payload: data})
    }catch(err){
        dispatch({type: USER_LIST_FAILURE, payload: err})
    }
}

export const deleteUser = (id) => async(dispatch,getState) => {
    const {userLogin:{userInfo}} = getState()
    try{
        dispatch({type: USER_DELETE_REQUEST})
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`https://mighty-savannah-06065.herokuapp.com/api/users/${id}`,config)
        dispatch({type: USER_DELETE_SUCCESS})
    }catch(err){
        dispatch({type: USER_DELETE_FAILURE, payload: err})
    }
}

export const updateUser = (user) => async(dispatch,getState) => {
    try{
        dispatch({type: USER_UPDATE_REQUEST})
        const {userLogin :{userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`https://mighty-savannah-06065.herokuapp.com/api/users/${user._id}`,user,config)
        dispatch({type: USER_UPDATE_SUCCESS})
        dispatch({type: USER_DETAILS_SUCCESS, payload: data})
    }catch(err){
        dispatch({type: USER_UPDATE_FAILURE,payload : err})
    }
}