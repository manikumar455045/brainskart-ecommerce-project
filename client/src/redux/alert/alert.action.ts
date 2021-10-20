import {v4} from 'uuid'

export const SET_ALERT : string = "SET_ALERT";
export const REMOVE_ALERT : string = "REMOVE_ALERT";

export const displayAlert = (message : string , color : string) => {
    return (dispatch:any) => {
        let id = v4();
        dispatch({
            type : SET_ALERT,
            payload : {
                id : id,
                message : message,
                color : color
            }
        })
        setTimeout(() => {
            dispatch(removeAlert(id));
        } , 3000)
    }
}

export const removeAlert = (id : string) => {
    return (dispatch : any) => {
        dispatch({
            type : REMOVE_ALERT,
            payload : {
                id : id
            }
        })
    }
}