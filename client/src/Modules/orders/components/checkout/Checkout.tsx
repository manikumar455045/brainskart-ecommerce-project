import React from "react";
import * as userReducer from '../../../../redux/users/user.reducer';
import * as orderReducer from '../../../../redux/orders/orders.reducer';
import {useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import {removeCartItem} from "../../../../redux/orders/orders.action";
import {calculateGrandTotal, calculateTax, calculateTotal} from "../../../../CartFunctions";

interface IProps{

}
interface IUser{
    users : userReducer.UserState
}
interface IOrder {
    orders : orderReducer.orderState
}



let Checkout : React.FC<IProps> = () => {
    let userState : userReducer.UserState = useSelector((state : IUser) => {
        return state.users
    })
    let orderState : orderReducer.orderState = useSelector((state : IOrder) => {
        return state.orders
    })
    return(
        <React.Fragment>
            {/*<pre>{JSON.stringify(userState)}</pre>
            <pre>{JSON.stringify(orderState)}</pre>*/}
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col">
                                        <p className="h4 float-left">Billing Address</p>
                                    </div>
                                    <div className="col">
                                        <Link to={`/users/profile`} className="btn btn-brown text-dark btn-sm float-right">Update Address</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                {
                                    userState.user && userState.user.address &&
                                    <ul className="list-group">
                                        <li className="list-group-item">Flat : {userState.user.address.flat}</li>
                                        <li className="list-group-item">Street : {userState.user.address.street}</li>
                                        <li className="list-group-item">Landmark : {userState.user.address.landmark}</li>
                                        <li className="list-group-item">City : {userState.user.address.city}</li>
                                        <li className="list-group-item">State : {userState.user.address.state}</li>
                                        <li className="list-group-item">Country : {userState.user.address.country}</li>
                                        <li className="list-group-item">Pin : {userState.user.address.pin}</li>
                                    </ul>
                                }
                            </div>
                        </div>
                        <div className="card mt-3">
                            <div className="card-header bg-dark text-brown">
                                <p className="h4">Payment Details</p>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault"
                                               id="flexRadioDefault1"/>
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Cash On Delivery
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault"
                                               id="flexRadioDefault2"/>
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            Credit Card Payment
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">
                                <p className="h4">Your Cart</p>
                            </div>
                            <div className="card-body">
                                <ul className="list-group">
                                    {
                                        orderState.cartItems.length>0 &&
                                            orderState.cartItems.map(cartItem => {
                                                return(
                                                    <li key={cartItem._id} className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col-md-2">
                                                                <img src={cartItem.image} width="50" height="75" alt=""/>
                                                            </div>
                                                            <div className="col-md-8">
                                                                <small>{cartItem.name}</small><br/>
                                                                <small><b>&#8377; {cartItem.price.toFixed(2)}</b></small><br/>
                                                                <small>Qty : {cartItem.qty}</small>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                    }
                                </ul>
                                <ul className="list-group">
                                    <li className="list-group-item">Total : {calculateTotal(orderState.cartItems)} </li>
                                    <li className="list-group-item">Tax : {calculateTax(orderState.cartItems)} </li>
                                    <li className="list-group-item">Grand Total : {calculateGrandTotal(orderState.cartItems)} </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Checkout;