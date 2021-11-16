import {IProduct} from "../../Modules/products/Models/IProduct";
import * as AuthUtil from "../../Authentication/AuthUtil"
import * as TokenUtil from "../../Authentication/TokenUtil"
import axios from "axios";
import {setHeaders} from "../../Authentication/TokenUtil";

export const ADD_TO_CART_REQUEST : string = "ADD_TO_CART_REQUEST";
export const ADD_TO_CART_FAILURE : string = "ADD_TO_CART_FAILURE";

export const INCREMENT_PRODUCT_QTY : string = "INCREMENT_PRODUCT_QTY";
export const DECREMENT_PRODUCT_QTY : string = "DECREMENT_PRODUCT_QTY";

export const REMOVE_CART_ITEM : string = "REMOVE_CART_ITEM";

export const MAKE_PAYMENT_REQUEST : string = "MAKE_PAYMENT_REQUEST"
export const MAKE_PAYMENT_SUCCESS : string = "MAKE_PAYMENT_SUCCESS"
export const MAKE_PAYMENT_FAILURE : string = "MAKE_PAYMENT_FAILURE"

export const PLACE_ORDER_REQUEST : string = "PLACE_ORDER_REQUEST"
export const PLACE_ORDER_SUCCESS : string = "PLACE_ORDER_SUCCESS"
export const PLACE_ORDER_FAILURE : string = "PLACE_ORDER_FAILURE"

export const GET_ALL_ORDERS_REQUEST : string = "GET_ALL_ORDERS_REQUEST"
export const GET_ALL_ORDERS_SUCCESS : string = "GET_ALL_ORDERS_SUCCESS"
export const GET_ALL_ORDERS_FAILURE : string = "GET_ALL_ORDERS_FAILURE"

export const CLEAR_CART : string = "CLEAR_CART"

export const addToCart = (product : IProduct , qty : number , history : any) => {
    return (dispatch : any) => {
        try{
            product.qty = qty;
            dispatch({
                type : ADD_TO_CART_REQUEST,
                payload : {
                    product : product
                }
            })
            history.push('/orders/cart');
        }
        catch (error){
            dispatch({
                type : ADD_TO_CART_FAILURE,
                payload : error
            })
        }
    }
}

export const incrementProductQty = (productTd : string) => {
    return (dispatch : any) => {
        dispatch({
            type : INCREMENT_PRODUCT_QTY,
            payload : {
                productId : productTd
            }
        })
    }
}
export const decrementProductQty = (productTd : string) => {
    return (dispatch : any) => {
        dispatch({
            type : DECREMENT_PRODUCT_QTY,
            payload : {
                productId : productTd
            }
        })
    }
}
export const removeCartItem = (productId : string) => {
    return (dispatch : any) => {
        dispatch({
            type : REMOVE_CART_ITEM,
            payload : productId
        })
    }
}

export const makeStripePayment = (paymentBody : any, history : any , order : any) => {
    return async ( dispatch : any) => {
        dispatch({
            type : MAKE_PAYMENT_REQUEST
        })
        try{
            if(AuthUtil.isLoggedIn()){
                let token = AuthUtil.getToken();
                TokenUtil.setHeaders(token as string);
                TokenUtil.setStripeKey();
                let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/payments/checkout`
                let response = await axios.post(dataUrl , paymentBody)
                dispatch({
                    type : MAKE_PAYMENT_SUCCESS,
                    payload : response.data.msg
                })
                dispatch(placeOrder(order , history))

            }
        }
        catch (error){
            console.error(error?.response?.data);
            dispatch({type : MAKE_PAYMENT_FAILURE, payload : error?.response?.data});
        }
    }
}
export const placeOrder = (order : any , history : any) => {
    return async (dispatch : any) => {
        dispatch({
            type : PLACE_ORDER_REQUEST
        })
        try{
            if(AuthUtil.isLoggedIn()){
                let token = AuthUtil.getToken();
                setHeaders(token as string);
                let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/orders/place`
                let response = await axios.post(dataUrl , order)
                dispatch({
                    type : PLACE_ORDER_SUCCESS,
                    payload : response.data.order
                })
                history.push('/orders/success')
            }
        }
        catch (error) {
            console.error(error?.response?.data);
            dispatch({type : PLACE_ORDER_FAILURE, payload : error?.response?.data});
        }
    }
}
export const clearCart = () => {
    return (dispatch : any) =>
    dispatch({
        type : CLEAR_CART
    })
}
export const getOrderList = () => {
    return async (dispatch : any) => {
        dispatch({
            type : GET_ALL_ORDERS_REQUEST
        })
        try{
            if(AuthUtil.isLoggedIn()){
                let token = AuthUtil.getToken();
                setHeaders(token as string);
                let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/orders/`
                let response = await axios.get(dataUrl)
                dispatch({
                    type : GET_ALL_ORDERS_SUCCESS,
                    payload : response.data.orders
                })
            }
        }
        catch (error) {
            console.error(error?.response?.data);
            dispatch({type : GET_ALL_ORDERS_FAILURE, payload : error?.response?.data});
        }
    }
}
