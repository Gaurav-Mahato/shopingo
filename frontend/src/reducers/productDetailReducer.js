import { PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_DELETE_FAILURE, PRODUCT_UPDATE_RESET, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAILURE, PRODUCT_CREATE_REVIEW_RESET } from "../actions/types"

const initState = {
    product: {
        reviews: []
    },
    loading: '',
    error: ''
}

export const productDetailsReducer = (state = initState, action) => {
    switch(action.type){
        case PRODUCT_DETAIL_REQUEST:
            return {...state, loading: true}
        case PRODUCT_DETAIL_SUCCESS:
            return {...state, loading: false, product: action.payload}
        case PRODUCT_DETAIL_FAIL:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}

export const productUpdateReducer = (state= {product:{}},action) => {
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST:
            return {
                loading: true
            }
        case PRODUCT_UPDATE_SUCCESS:
            return {
                loading: false,
                product: action.payload,
                success: true
            }
        case PRODUCT_DELETE_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case PRODUCT_UPDATE_RESET:
            return {product: {}}
        default:
            return state
    }
}

export const productCreateReviewReducer = (state={},action) => {
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading: true}
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case PRODUCT_CREATE_REVIEW_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }
}