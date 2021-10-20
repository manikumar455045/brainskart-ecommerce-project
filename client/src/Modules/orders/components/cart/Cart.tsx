import React from "react";
import * as orderActions from '../../../../redux/orders/orders.action';
import * as orderReducer from '../../../../redux/orders/orders.reducer';
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom'
import {calculateTotal , calculateTax , calculateGrandTotal} from "../../../../CartFunctions";

interface IProps{

}
interface IState{
    orders : orderReducer.orderState
}

let Cart : React.FC<IProps> = () => {
    let dispatch = useDispatch();
    let orderState : orderReducer.orderState = useSelector((state : IState) => {
        return state.orders;
    })
    let incrQty = (productId : string) => {
        dispatch(orderActions.incrementProductQty(productId))
    }
    let decrQty = (productId : string) => {
        dispatch(orderActions.decrementProductQty(productId))
    }
    let deleteCartItems = (productId : string) => {
        dispatch(orderActions.removeCartItem(productId))
    }
    return(
        <React.Fragment>
            {/*<pre>{JSON.stringify(orderState)}</pre>*/}
            {
                orderState.cartItems.length > 0 ?
                    <React.Fragment>
                        <section className='mt-3'>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="card">
                                            <div className="card-header text-center bg-dark text-white">
                                                Your Cart Items
                                            </div>
                                            <div className="card-body">
                                                <table className="table table-hover table-striped text-center">
                                                    <thead>
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                        <th>Qty</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        orderState.cartItems.map((cartItem , index) => {
                                                            return(
                                                                <tr key={cartItem._id}>
                                                                    <td><img src={cartItem.image} className='img-fluid' width='50' height='50' alt=""/></td>
                                                                    <td>{cartItem.name}</td>
                                                                    <td>{cartItem.price}</td>
                                                                    <td><i className='fa fa-minus-circle' onClick={decrQty.bind(this , cartItem._id as string)} ></i>{cartItem.qty}<i className='fa fa-plus-circle' onClick={incrQty.bind(this , cartItem._id as string)}></i></td>
                                                                    <td><button className="btn btn-danger btn-sm" onClick={deleteCartItems.bind(this,cartItem._id as string)} >Delete</button></td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card bg-brown">
                                            <div className="card-header bg-dark text-white text-center">Your Total Amount</div>
                                            <div className="card-body">
                                                <ul className="list-group">
                                                    <li className="list-group-item">Total : {calculateTotal(orderState.cartItems)} </li>
                                                    <li className="list-group-item">Tax : {calculateTax(orderState.cartItems)} </li>
                                                    <li className="list-group-item">Grand Total : {calculateGrandTotal(orderState.cartItems)} </li>
                                                </ul>
                                                <Link to = '/orders/checkout' className="btn btn-dark text-white">Checkout</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <div className="text-center">
                            <p className="lead">--------Your Cart is Empty----------</p>
                            <p className="lead">Click <Link to='/'>here</Link> to shop</p>
                        </div>
                    </React.Fragment>
            }
        </React.Fragment>
    )
}

export default Cart;