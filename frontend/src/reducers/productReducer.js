import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DELETE_FAILURE, TOP_PRODUCT_REQUEST, TOP_PRODUCT_SUCCESS, TOP_PRODUCT_FAILURE, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAILURE, PRODUCT_CREATE_RESET, PRODUCT_DELETE_SUCCESS } from "../actions/types"

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
        case PRODUCT_DELETE_SUCCESS:
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

export const productTopRatedReducer = (state={products: []},action) => {
    switch(action.type){
        case TOP_PRODUCT_REQUEST:
            return {loading: true, products: []}
        case TOP_PRODUCT_SUCCESS:
            return {loading: false, products: action.payload}
        case TOP_PRODUCT_FAILURE:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const productCreateReducer = (state={},action) => {
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:
            return {loading: true}
        case PRODUCT_CREATE_SUCCESS:
            return {loading: false, success: true, product: action.payload}
        case PRODUCT_CREATE_FAILURE:
            return {loading: false, error: action.payload}
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}