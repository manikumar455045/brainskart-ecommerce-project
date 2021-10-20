import * as ProductActions from './product.action';
import {IProduct} from "../../Modules/products/Models/IProduct";

export interface ProductState {
    loading : boolean,
    products : IProduct[],
    product : IProduct,
    errorMessage : string
}

let initialState : ProductState = {
    loading : false,
    products : [] as IProduct[],
    product : {} as IProduct,
    errorMessage : ''
}

export const reducer = (state = initialState , action : any) : ProductState => {
    switch (action.type){
        case ProductActions.PRODUCT_UPLOAD_REQUEST :
            return {
                ...state,
                loading : true
            }
        case ProductActions.PRODUCT_UPLOAD_SUCCESS :
            return {
                ...state,
                loading : false
            }
        case ProductActions.PRODUCT_UPLOAD_FAILURE :
            return {
                ...state,
                loading : false,
                errorMessage : action.payload
            }
        case ProductActions.GET_MENS_PRODUCTS_REQUEST :
            return {
                ...state,
                loading : true
            }
        case ProductActions.GET_MENS_PRODUCTS_SUCCESS :
            return {
                ...state,
                loading : false,
                products : action.payload.products
            }
        case ProductActions.GET_MENS_PRODUCTS_FAILURE :
            return {
                ...state,
                loading : false,
                errorMessage : action.payload
            }
        case ProductActions.GET_WOMEN_PRODUCTS_REQUEST :
            return {
                ...state,
                loading : true
            }
        case ProductActions.GET_WOMEN_PRODUCTS_SUCCESS :
            return {
                ...state,
                loading : false,
                products : action.payload
            }
        case ProductActions.GET_WOMEN_PRODUCTS_FAILURE :
            return {
                ...state,
                loading : false,
                errorMessage : action.payload
            }
        case ProductActions.GET_KIDS_PRODUCTS_REQUEST :
            return {
                ...state,
                loading : true
            }
        case ProductActions.GET_KIDS_PRODUCTS_SUCCESS :
            return {
                ...state,
                loading : false,
                products : action.payload
            }
        case ProductActions.GET_KIDS_PRODUCTS_FAILURE :
            return {
                ...state,
                loading : false,
                errorMessage : action.payload
            }
        case ProductActions.GET_PRODUCT_REQUEST :
            return {
                ...state,
                loading : true
            }
        case ProductActions.GET_PRODUCT_SUCCESS :
            return {
                ...state,
                loading : false,
                product : action.payload
            }
        case ProductActions.GET_PRODUCT_FAILURE : {
            return {
                ...state,
                loading : false,
                errorMessage : action.payload
            }
        }
        default : return state
    }
}