import {IProduct} from "./Modules/products/Models/IProduct";

let Product_Tax = 5;

export const  calculateTotal = (cartItems : IProduct[]) : number => {
    let Total : number = 0;
    for (let cartItem of cartItems){
        Total+= cartItem.price * cartItem.qty;
    }
    return Total
}

export const calculateTax = (cartItems : IProduct[]) : number => {
    return calculateTotal(cartItems) * Product_Tax/100;
}

export const calculateGrandTotal = (cartItems : IProduct[]) : number => {
    return calculateTotal(cartItems) + calculateTax(cartItems)
}