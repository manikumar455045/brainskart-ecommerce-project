import * as OrderActions from './orders.action';
import {IProduct} from "../../Modules/products/Models/IProduct";



export interface orderState {
    loading : boolean,
    cartItems : IProduct[],
    orders : IProduct[],
    errorMessage : string
}
let initialState : orderState = {
    loading : false,
    cartItems : [] as IProduct[],
    orders : [] as IProduct[],
    errorMessage : ''
}

export  const reducer = (state = initialState , action : any) : orderState => {
    switch (action.type) {
        case OrderActions.ADD_TO_CART_REQUEST :
            let existingCartItem = state.cartItems.find(cartItem => cartItem._id === action.payload.product._id)
            if(existingCartItem){
                alert("Product already exists in Cart")
                return state
            }
            else
            return {
                ...state,
                cartItems : [...state.cartItems , action.payload.product]
            }
        case OrderActions.ADD_TO_CART_FAILURE :
            return {
                ...state,
                errorMessage : action.payload
            }
        case OrderActions.INCREMENT_PRODUCT_QTY :
            let incrementItems : IProduct[] = state.cartItems.map((product) => {
                if(action.payload.productId === product._id){
                    return{
                        ...product,
                        qty : product.qty + 1
                    }
                }
                else return product;
            })
            return {
                ...state,
                cartItems : [...incrementItems]
            }
        case OrderActions.DECREMENT_PRODUCT_QTY :
            let decrementItems : IProduct[] = state.cartItems.map((product) => {
                if(action.payload.productId === product._id){
                    return{
                        ...product,
                        qty : product.qty - 1 > 0 ? product.qty - 1 : 1
                    }
                }
                else return product;
            })
            return {
                ...state,
                cartItems : [...decrementItems]
            }
        case OrderActions.REMOVE_CART_ITEM :
            let updatedCartItems : IProduct[] = state.cartItems.filter(cartItem => cartItem._id !== action.payload)
            return {
                ...state,
                cartItems : [...updatedCartItems]
            }
        default : return state
    }
}
