import axios from "axios";
import {IProduct} from "../../Modules/products/Models/IProduct";
import * as AuthUtil from "../../Authentication/AuthUtil"
import * as TokenUtil from "../../Authentication/TokenUtil"
import {displayAlert} from "../alert/alert.action";

export const PRODUCT_UPLOAD_REQUEST : string = "PRODUCT_UPLOAD_REQUEST";
export const PRODUCT_UPLOAD_SUCCESS : string = "PRODUCT_UPLOAD_SUCCESS";
export const PRODUCT_UPLOAD_FAILURE : string = "PRODUCT_UPLOAD_FAILURE";

export const GET_MENS_PRODUCTS_REQUEST : string = "GET_MENS_PRODUCTS_REQUEST";
export const GET_MENS_PRODUCTS_SUCCESS : string = "GET_MENS_PRODUCTS_SUCCESS";
export const GET_MENS_PRODUCTS_FAILURE : string = "GET_MENS_PRODUCTS_FAILURE";

export const GET_WOMEN_PRODUCTS_REQUEST : string = "GET_WOMEN_PRODUCTS_REQUEST";
export const GET_WOMEN_PRODUCTS_SUCCESS : string = "GET_WOMEN_PRODUCTS_SUCCESS";
export const GET_WOMEN_PRODUCTS_FAILURE : string = "GET_WOMEN_PRODUCTS_FAILURE";

export const GET_KIDS_PRODUCTS_REQUEST : string = "GET_KIDS_PRODUCTS_REQUEST";
export const GET_KIDS_PRODUCTS_SUCCESS : string = "GET_KIDS_PRODUCTS_SUCCESS";
export const GET_KIDS_PRODUCTS_FAILURE : string = "GET_KIDS_PRODUCTS_FAILURE";

export const GET_PRODUCT_REQUEST : string = "GET_PRODUCT_REQUEST";
export const GET_PRODUCT_SUCCESS : string = "GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_FAILURE : string = "GET_PRODUCT_FAILURE";


export const uploadProduct = (product : IProduct , history : any) => {
    return async (dispatch : any) => {
        dispatch({
            type : PRODUCT_UPLOAD_REQUEST
        })
        try{
            if(AuthUtil.isLoggedIn()){
                TokenUtil.setHeaders(AuthUtil.getToken() as string)
            }
            let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/products/upload`;
            let response = await axios.post(dataUrl , product);
            dispatch({
                type : PRODUCT_UPLOAD_SUCCESS,
                payload : response.data
            })
            dispatch(displayAlert(response.data.msg , 'success'))
            history.push('/')
        }
        catch (error){
            dispatch({
                type : PRODUCT_UPLOAD_FAILURE,
                payload : error.response.data
            })
        }
    }
}

export const getMensProducts = () => {
    return async (dispatch : any) => {
        dispatch({
            type : GET_MENS_PRODUCTS_REQUEST
        })
        try{
            let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/products/men`;
            let response = await axios.get(dataUrl);
            dispatch({
                type : GET_MENS_PRODUCTS_SUCCESS,
                payload : response.data
            })
        }
        catch (error){
            console.error(error);
            dispatch({
                type : GET_MENS_PRODUCTS_FAILURE,
                payload : error.response.data
            })
        }
    }
}
export const getWomenProducts = () => {
    return async (dispatch : any) => {
        dispatch({
            type : GET_WOMEN_PRODUCTS_REQUEST
        })
        try{
            let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/products/women`;
            let response = await axios.get(dataUrl);
            dispatch({
                type : GET_WOMEN_PRODUCTS_SUCCESS,
                payload : response.data
            })
        }
        catch (error){
            console.error(error);
            dispatch({
                type : GET_WOMEN_PRODUCTS_FAILURE,
                payload : error.response.data
            })
        }
    }
}
export const getKidsProducts = () => {
    return async (dispatch : any) => {
        dispatch({
            type : GET_KIDS_PRODUCTS_REQUEST
        })
        try{
            let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/products/kids`;
            let response = await axios.get(dataUrl);
            dispatch({
                type : GET_KIDS_PRODUCTS_SUCCESS,
                payload : response.data
            })
        }
        catch (error){
            console.error(error);
            dispatch({
                type : GET_KIDS_PRODUCTS_FAILURE,
                payload : error.response.data
            })
        }
    }
}
export const getProduct = (productId : string) => {
    return async (dispatch : any) => {
        dispatch({
            type : GET_PRODUCT_REQUEST
        })
        try{
            let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/products/${productId}`;
            let response = await axios.get(dataUrl);
            dispatch({
                type : GET_PRODUCT_SUCCESS,
                payload : response.data
            })
        }
        catch (error){
            console.error(error);
            dispatch({
                type : GET_KIDS_PRODUCTS_FAILURE,
                payload : error.response.data
            })
        }
    }
}