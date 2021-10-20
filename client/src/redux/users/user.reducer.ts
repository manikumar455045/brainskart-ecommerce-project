import * as userActions from './user.action';
import {IUser} from "../../Modules/users/models/IUser";
import {USER_REGISTER_REQUEST} from "./user.action";

export interface UserState {
    loading : boolean,
    user : IUser,
    isAuthenticated : boolean,
    token : string,
    errorMessage : string
}

let initialstate : UserState = {
    loading : false,
    user : {} as IUser,
    isAuthenticated : false,
    token : '',
    errorMessage : ''
}

export const reducer = (state = initialstate , action : any) : UserState => {
    switch (action.type){
        case userActions.USER_REGISTER_REQUEST :
            return ({
                ...state,
                loading : true
            })
        case userActions.USER_REGISTER_SUCCESS :
            return ({
                ...state,
                loading : false
            })
        case userActions.USER_REGISTER_FAILURE :
            return ({
                ...state,
                loading : false,
                errorMessage : action.payload
            })
        case userActions.USER_LOGIN_REQUEST :
            return ({
                ...state,
                loading : true
            })
        case userActions.USER_LOGIN_SUCCESS :
            localStorage.setItem(process.env.REACT_APP_FEATURE_KEY as string, action.payload.token)
            return ({
                ...state,
                loading : false,
                isAuthenticated : true,
                token : action.payload.token
            })
        case userActions.USER_LOGIN_FAILURE:
            localStorage.removeItem(process.env.REACT_APP_FEATURE_KEY as string);
            return {
                ...state,
                loading : false,
                token : '',
                isAuthenticated : false,
                errorMessage : action.payload
            };
        case userActions.LOGOUT_USER :
            localStorage.removeItem(process.env.REACT_APP_FEATURE_KEY as string);
            return {
                ...state,
                loading : false,
                token : '',
                isAuthenticated : false
            };
        case userActions.USER_INFO_REQUEST :
            return {
                ...state,
                loading : true
            };
        case userActions.USER_INFO_SUCCESS :
            return {
                ...state,
                loading : false,
                user : action.payload.response,
                token : action.payload.token,
                isAuthenticated : true
            }
        case userActions.USER_INFO_FAILURE:
            return {
                ...state,
                loading : false,
                errorMessage : action.payload
            }
        case userActions.UPDATE_ADDRESS_REQUEST :
            return {
                ...state,
                loading : true
            }
        case userActions.UPDATE_ADDRESS_SUCCESS :
            return {
                ...state,
                loading : false
            }
        case userActions.UPDATE_ADDRESS_FAILURE :
            return {
                ...state,
                loading : false,
                errorMessage : action.payload
            }
        case userActions.GOOGLE_REGISTER_REQUEST :
            return {
                ...state,
                loading : true
            }
        case userActions.GOOGLE_REGISTER_SUCCESS :
            localStorage.setItem(process.env.REACT_APP_FEATURE_KEY as string, action.payload.token)
            return {
                ...state,
                loading : false,
                token : action.payload.token,
                isAuthenticated : true
            }
        case userActions.GOOGLE_REGISTER_FAILURE :
            localStorage.removeItem(process.env.REACT_APP_FEATURE_KEY as string)
            return {
                ...state,
                loading : false,
                token : '',
                isAuthenticated : false,
                errorMessage : action.payload.error
            }
        default : return state
    }
}