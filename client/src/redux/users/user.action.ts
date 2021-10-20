import axios from 'axios';
import * as alertActions from '../alert/alert.action';
import {useDispatch} from "react-redux";
import * as AuthUtil from '../../Authentication/AuthUtil'
import {setHeaders} from "../../Authentication/TokenUtil";
import {IAddress} from "../../Modules/users/models/IUser";


export  const USER_REGISTER_REQUEST : string = "USER_REGISTER_REQUEST"
export  const USER_REGISTER_SUCCESS : string = "USER_REGISTER_SUCCESS"
export  const USER_REGISTER_FAILURE : string = "USER_REGISTER_FAILURE"

export  const GOOGLE_REGISTER_REQUEST : string = "GOOGLE_REGISTER_REQUEST"
export  const GOOGLE_REGISTER_SUCCESS : string = "GOOGLE_REGISTER_SUCCESS"
export  const GOOGLE_REGISTER_FAILURE : string = "GOOGLE_REGISTER_FAILURE"

export  const USER_LOGIN_REQUEST : string = "USER_LOGIN_REQUEST"
export  const USER_LOGIN_SUCCESS : string = "USER_LOGIN_SUCCESS"
export  const USER_LOGIN_FAILURE : string = "USER_LOGIN_FAILURE"

export  const USER_INFO_REQUEST : string = "USER_INFO_REQUEST"
export  const USER_INFO_SUCCESS : string = "USER_INFO_SUCCESS"
export  const USER_INFO_FAILURE : string = "USER_INFO_FAILURE"

export const UPDATE_ADDRESS_REQUEST : string = "UPDATE_ADDRESS_REQUEST"
export const UPDATE_ADDRESS_SUCCESS : string = "UPDATE_ADDRESS_SUCCESS"
export const UPDATE_ADDRESS_FAILURE : string = "UPDATE_ADDRESS_REQUEST"

export const LOGOUT_USER : string = "LOGOUT_USER"

interface  IUser{
    name? : string,
    email : string,
    password: string
}
//register user
export const userRegister = (user : IUser , history : any) => {
    return async (dispatch : any) =>{
        dispatch({
            type : USER_REGISTER_REQUEST
        })
           try{
               let dataUrl : string | undefined = `${process.env.REACT_APP_SERVER_URL}/api/users/register`
               let response = await axios.post(dataUrl , user)
               dispatch({
                   type : USER_REGISTER_SUCCESS,
                   payload : response.data
               })
               dispatch(alertActions.displayAlert(response.data.msg ,'success')) // alert message
               history.push('/users/login');
           }
          catch (error) {
            dispatch({
                type : USER_REGISTER_FAILURE,
                payload : error
            })
          }
    }
}
//login user

export  const loginUser = (user : IUser , history : any) => {
    return async (dispatch : any) => {
        dispatch({
            type : USER_LOGIN_REQUEST
        })
        try{
            let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/users/login`
            let response =  await  axios.post(dataUrl , user)
            dispatch({
                type : USER_LOGIN_SUCCESS,
                payload : response.data
            })
            dispatch(getUserInfo());
            dispatch(alertActions.displayAlert(response.data.msg , 'success'));
            history.push('/');
        }
        catch (error){
            dispatch({
                type : USER_LOGIN_FAILURE,
                payload : error
            })
        }

    }
}

export const getUserInfo = () => {
    return async (dispatch: any) => {
        dispatch({
            type: USER_INFO_REQUEST
        })
        try {
            if (AuthUtil.isLoggedIn()) {
                let token: string | null = AuthUtil.getToken();
                setHeaders(token as string);
                let datUrl = `${process.env.REACT_APP_SERVER_URL}/api/users/`
                let response = await axios.get(datUrl);
                dispatch({
                    type: USER_INFO_SUCCESS,
                    payload:{
                        response : response.data,
                        token : AuthUtil.getToken()
                    }
                })
            }
        }
        catch(error){
            dispatch({
                type : USER_INFO_FAILURE,
                payload :error
            })
        }
    }
}

export const logoutUser = () => {
    return (dispatch : any) => {
        dispatch({
            type : LOGOUT_USER
        })
        dispatch(alertActions.displayAlert("You have logged out" , "success"));
    }
}

export const updateAddress = (address : IAddress) => {
    return async (dispatch : any) => {
        dispatch({
            type : UPDATE_ADDRESS_REQUEST
        })
        try{
            if(AuthUtil.isLoggedIn()){
                setHeaders(AuthUtil.getToken() as string);
                let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/users/address`
               let response = await axios.post(dataUrl, address)
                dispatch({
                    type : UPDATE_ADDRESS_SUCCESS,
                    payload : response.data
                })
                dispatch(getUserInfo());
                dispatch(alertActions.displayAlert(response.data.msg, 'success'))
            }
        }
        catch (error){
            dispatch({
                type : UPDATE_ADDRESS_FAILURE,
                payload : error
            })
        }
    }
}
//google login or signup
export const googleLogin = (tokenID : any , history : any) => {
    return async (dispatch : any) => {
        dispatch({
            type : GOOGLE_REGISTER_REQUEST
        })
        try{
            let dataUrl : string | undefined = `${process.env.REACT_APP_SERVER_URL}/api/users/GoogleLogin`
            let response = await axios.post(dataUrl , {tokenID})
            console.log(response);
            dispatch({
                type : GOOGLE_REGISTER_SUCCESS,
                payload : {
                    token : response.data.token
                }
            })
            dispatch(getUserInfo())
            dispatch(alertActions.displayAlert(response.data.msg , "success"));
            history.push("/");
        }
        catch (error){
            dispatch({
                type : GOOGLE_REGISTER_FAILURE,
                payload : {
                    error : error
                }
            })
            dispatch(alertActions.displayAlert(error.message , "danger"))
            console.log(error)
        }
    }
}