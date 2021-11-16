import * as OrderActions from './orders.action';
import {IProduct} from "../../Modules/products/Models/IProduct";
import {IOrder} from "../../Modules/orders/IOrders";



export interface orderState {
    loading : boolean,
    cartItems : IProduct[],
    order : IOrder,
    orderList : IOrder[],
    errorMessage : string
}
let initialState : orderState = {
    loading : false,
    cartItems : [] as IProduct[],
    order : {} as IOrder,
    orderList : [] as IOrder[],
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
        // Make Stripe Payments
        case OrderActions.MAKE_PAYMENT_REQUEST:
            return {
                ...state,
                loading : true
            };
        case OrderActions.MAKE_PAYMENT_SUCCESS:
            return {
                ...state,
                loading : false
            };
        case OrderActions.MAKE_PAYMENT_FAILURE:
            return {
                ...state,
                loading : false,
                errorMessage : action.payload
            };
        case OrderActions.PLACE_ORDER_REQUEST :
            return {
                ...state,
                loading : true
            }
        case OrderActions.PLACE_ORDER_SUCCESS :
            return {
                ...state,
                order : action.payload,
                loading : false
            }
        case OrderActions.PLACE_ORDER_FAILURE :
            return {
                ...state,
                loading : false,
                errorMessage : action.payload
            }
        case OrderActions.CLEAR_CART :
            return {
                ...state,
                cartItems : [],
                order : {} as IOrder
            }
        case OrderActions.GET_ALL_ORDERS_REQUEST :
            return {
                ...state,
                loading : true
            }
        case OrderActions.GET_ALL_ORDERS_SUCCESS :
            return {
                ...state,
                loading : false,
                orderList : action.payload
            }
        case OrderActions.GET_ALL_ORDERS_FAILURE :
            return {
                ...state,
                loading : false,
                errorMessage : action.payload
            }
        default : return state
    }
}
