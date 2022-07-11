import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DELETE_FAILURE } from "../actions/types"

const initState = {
    products: [],
    loading: '',
    error: ''
}

export const productListReducer =  (state = initState, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {...state, loading: true}
        case PRODUCT_LIST_SUCCESS:
            return {...state, loading: false, products: action.payload.products, page: action.payload.page, pages: action.payload.pages}
        case PRODUCT_LIST_FAIL:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}

export const productDeleteReducer = (state = {},action) => {
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return {
                loading: true
            }
        case PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case PRODUCT_DELETE_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}