import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from './types';

export const addToCart = (id,qty) => async (dispatch,getState) => {
    const {data} = await axios.get(`http://localhost:8080/api/products/${id}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            price: data.price,
            image: data.image,
            countInStocks: data.countInStocks,
            qty
        },
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch,getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}