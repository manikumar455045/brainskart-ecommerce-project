import {IProduct} from "../../Modules/products/Models/IProduct";

export const ADD_TO_CART_REQUEST : string = "ADD_TO_CART_REQUEST";
export const ADD_TO_CART_FAILURE : string = "ADD_TO_CART_FAILURE";

export const INCREMENT_PRODUCT_QTY : string = "INCREMENT_PRODUCT_QTY";
export const DECREMENT_PRODUCT_QTY : string = "DECREMENT_PRODUCT_QTY";

export const REMOVE_CART_ITEM : string = "REMOVE_CART_ITEM";

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