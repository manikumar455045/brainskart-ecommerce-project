import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as OrderActions from "../../../../redux/orders/orders.action";
import * as OrderReducer from "../../../../redux/orders/orders.reducer";

interface IProps{

}
interface IOrder {
    orders : OrderReducer.orderState
}

let OrderList : React.FC<IProps> = () => {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(OrderActions.getOrderList())
    },[])
    let orderState : OrderReducer.orderState = useSelector((state : IOrder) => {
        return state.orders;
    })
    let {orderList} = orderState
    return(
        <React.Fragment>
           {/*<small>{JSON.stringify(orderList)}</small>*/}
            <section className="mt-3">
                <div className="container">
                    <h3>Your Orders....</h3>
                </div>
            </section>
            <section className="mt-3">
                <div className="container">
                    <table className="table table-hover text-center table-striped">
                        <thead className="bg-dark text-white">
                        <tr>
                            <th>ID</th>
                            <th>Items</th>
                            <th>Total Price</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            orderList.map((item) => {
                                // @ts-ignore
                                // @ts-ignore
                                return(
                                <tr key={item._id}>
                                    <td>{item._id?.substr(item._id?.length - 5)}</td>
                                    <td>
                                        <ul className="list-group">
                                            {
                                                item.items.map((product) => {
                                                    return(
                                                        <React.Fragment><li className="list-group-item">
                                                            Name : {product.name}
                                                        </li>
                                                            <li className="list-group-item">Price : {product.price}</li>
                                                            <li className="list-group-item">Quantity : {product.qty}</li>
                                                            <li className="list-group-item">brand : {product.brand}</li>
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </td>
                                    <td>{item.total}</td>
                                    <td>{new Date(item.createdAt as string).toLocaleDateString()}</td>
                                </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </section>
        </React.Fragment>
    )
}

export default OrderList;