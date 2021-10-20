import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as ProductActions from "../../../../redux/product/product.action";
import * as ProductReducer from "../../../../redux/product/product.reducer";
import Spinner from "../../../layout/components/spinner/Spinner";
import Tilt from "react-parallax-tilt";
import * as orderActions from '../../../../redux/orders/orders.action';

interface IProps{}
interface UrlParams {
    productId : string
}
interface IState {
    products : ProductReducer.ProductState
}
interface IProductQty{
    qty : string
}

let ProductDetail : React.FC<IProps> = () => {
    let dispatch = useDispatch();
    let history = useHistory();
    let {productId} = useParams<UrlParams>();
    useEffect(() => {
        dispatch(ProductActions.getProduct(productId))
    },[productId])
    let ProductState : ProductReducer.ProductState = useSelector((state:IState) => {
        return state.products
    })
    let [productQty , setProductQty] = useState<IProductQty>({
        qty : ''
    })
    let updateQty = (event : React.ChangeEvent<HTMLSelectElement>) => {
        setProductQty({
            qty : event.target.value
        })
    }
    let submitToCart = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //dispatch action add to cart
        dispatch(orderActions.addToCart(ProductState.product , Number(productQty.qty) , history))
    }
    return(
        <React.Fragment>
            {
                ProductState.loading ? <Spinner/> :
                    <section className="mt-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <Tilt scale={1.25} transitionSpeed={3000}>
                                            <img src={ProductState.product.image} className="img-fluid d-block" width='300' height='320' alt=""/>
                                    </Tilt>
                                </div>
                                <div className="col-md-8">
                                    <p className="h3">NAME : <span className='lead'>{ProductState.product.name}</span></p>
                                    <p className="h3">Brand : <span className='lead'>{ProductState.product.brand}</span></p>
                                    <p className="h5">Price : <b className="text-danger">&#8377; {ProductState.product.price}</b></p>
                                    <form onSubmit={submitToCart}>
                                        <div className="form-group">
                                            <select
                                                required
                                                value={productQty.qty}
                                                onChange={updateQty}
                                                className="form-control">
                                                <option value="">Select Qty</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                            <input type="submit" className="btn btn-brown btn-sm text-dark" value="add to Cart"/>
                                        </div>
                                    </form>
                                    <hr/>
                                    <p className='lead'><span className='h3'>Details :</span> {ProductState.product.usage}</p>
                                    <hr/>
                                    <p className='lead'><span className='h3'>Usage :</span> {ProductState.product.description}</p>
                                </div>
                            </div>
                        </div>
                    </section>
            }
        </React.Fragment>
    )
}

export default ProductDetail;