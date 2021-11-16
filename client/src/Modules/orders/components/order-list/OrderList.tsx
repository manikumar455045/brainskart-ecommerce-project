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
           <small>{JSON.stringify(orderList)}</small>
        </React.Fragment>
    )
}

export default OrderList;