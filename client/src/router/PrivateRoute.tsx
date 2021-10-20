import React from "react";
import {Route , Redirect , RouteProps} from 'react-router-dom';
import * as AuthUtil from "../Authentication/AuthUtil";

interface Iprops{

}
// @ts-ignore
let PrivateRoute = ({component : Component , ...rest}) => {
    return <Route {...rest} render={(props) => {
        return !AuthUtil.isLoggedIn() ? <Redirect to="/users/login"/> : <Component {...props}/>
    }}/>
};
export default PrivateRoute;