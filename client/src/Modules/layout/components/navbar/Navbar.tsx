import React from "react";
import brand from "../../../../Assets/img/brand.png";
import {NavLink} from "react-router-dom";
import * as AuthUtil from '../../../../Authentication/AuthUtil';
import * as userActions from '../../../../redux/users/user.action';
import {useDispatch , useSelector} from "react-redux";
import * as userReducer from '../../../../redux/users/user.reducer'
import * as orderReducer from '../../../../redux/orders/orders.reducer';

interface IProps{

}

interface IState {
    users : userReducer.UserState
}
interface IOrder{
    orders : orderReducer.orderState
}

let Navbar : React.FC<IProps> = () => {
    let dispatch = useDispatch();
    let userState : userReducer.UserState = useSelector((state : IState) => {
        return state.users;
    })
    let orderState : orderReducer.orderState = useSelector((state : IOrder) => {
        return state.orders
    })
    let logoutUser = () => {
        dispatch(userActions.logoutUser());
    }
    return(
        <React.Fragment>
           <nav className = "navbar navbar-dark bg-dark navbar-expand-sm sticky-top">
               <div className = "container">
                   <NavLink to="/" className = "navbar-brand">
                   <img src={brand} alt="" width="130" height="30" />
                   </NavLink>
                   <button className="navbar-toggler" data-bs-target="#nav" data-bs-toggle="collapse">
                       <span className="navbar-toggler-icon"></span>
                   </button>
                   <div className="collapse navbar-collapse" id = "nav">
                       <ul className="navbar-nav me-auto">
                           <li className="nav-item">
                               <NavLink className="nav-link" to="/products/men">Men's wear</NavLink>
                           </li>
                           <li className="nav-item">
                               <NavLink className="nav-link" to="/products/women">Women's wear</NavLink>
                           </li>
                           <li className="nav-item">
                               <NavLink className="nav-link" to="/products/kids">Kids wear</NavLink>
                           </li>
                           {
                               AuthUtil.isLoggedIn() && userState.isAuthenticated &&
                               <li className="nav-item">
                                   <NavLink className="nav-link" to="/orders/cart"><i className="fa fa-shopping-cart"><span className="badge badge-success badge-pill">{orderState.cartItems.length}</span></i></NavLink>
                               </li>
                           }
                           {
                               AuthUtil.isLoggedIn() && userState.isAuthenticated && userState.user.isAdmin&&
                               <li className="nav-item">
                                   <NavLink to="/products/upload" className="nav-link">Upload</NavLink>
                               </li>
                           }
                           {
                               AuthUtil.isLoggedIn() && userState.isAuthenticated&&
                               <li className="nav-item">
                                   <NavLink to="/orders/list" className="nav-link">My Orders</NavLink>
                               </li>
                           }


                       </ul>
                       <div className="d-flex">
                           <ul className="navbar-nav">
                               {
                                   !AuthUtil.isLoggedIn() && !userState.isAuthenticated ?
                                       <React.Fragment>
                                           <li className="nav-item">
                                               <NavLink className="nav-link" to="/users/login"><i className="fas fa-sign-in-alt"></i>Login</NavLink>
                                           </li>
                                           <li className="nav-item">
                                               <NavLink className="nav-link" to="/users/register"><i className="fas fa-user-tag"></i>Register</NavLink>
                                           </li>
                                       </React.Fragment>
                                        :
                                       <React.Fragment>
                                           <li className="nav-item">
                                               <NavLink className="nav-link" to="/users/profile" >
                                                   <img src={userState.user.avatar} height="25" width="25" className="rounded-circle mr-2" alt=""/>
                                                   {userState.user.name}
                                               </NavLink>
                                           </li>
                                           <li className="nav-item">
                                               <NavLink className="nav-link" to="/" onClick={logoutUser}><i className="fas fa-sign-out-alt"></i>Logout</NavLink>
                                           </li>
                                       </React.Fragment>
                               }
                           </ul>
                       </div>
                   </div>
               </div>
           </nav>
        </React.Fragment>
    )
}

export default Navbar;