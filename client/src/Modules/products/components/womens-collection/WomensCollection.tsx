import React, {useEffect} from "react";
import * as ProductReducer from "../../../../redux/product/product.reducer";
import {useDispatch, useSelector} from "react-redux";
import * as ProductActions from "../../../../redux/product/product.action";
import Spinner from "../../../layout/components/spinner/Spinner";
import {Link, useHistory} from "react-router-dom";
import * as orderActions from '../../../../redux/orders/orders.action'
import {IProduct} from "../../Models/IProduct";

interface IProps{

}
interface IState{
    products : ProductReducer.ProductState
}

let WomensCollection : React.FC<IProps> = () => {
    let dispatch = useDispatch();
    let history = useHistory();
    let productState: ProductReducer.ProductState = useSelector((state:IState) => {
        return state.products;
    })
    useEffect(() =>{
        dispatch(ProductActions.getWomenProducts())
    }, [])

    let addToCart = (product: IProduct) => {
        dispatch(orderActions.addToCart(product , 1 , history))
    }
    return(
        <React.Fragment>
            {
                productState.loading? <Spinner/> :
                    <section className="mt-3">
                        <div className="container">
                            <div className="row">
                                {
                                    productState.products.length > 0 &&
                                    productState.products.map((product) => {
                                        return(
                                            <React.Fragment>
                                                <div key = {product._id} className="col">
                                                    <div className="card text-center">
                                                        <Link to={`/products/${product._id}`}><img src={product.image} className="img-fluid" alt=""/></Link>
                                                        <div className="card-body text-center">
                                                            <ul className="list-group">
                                                                <li className="list-group-item">
                                                                    <p className="h5">{product.name}</p>
                                                                    <span>{product.brand}</span>
                                                                    <p className="h6">&#8377; {product.price.toFixed(2)}</p>
                                                                    <button className="btn btn-brown btn-sm text-dark" onClick={addToCart.bind(this, product)}>Add Cart</button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </section>
            }
        </React.Fragment>
    )
}

export default WomensCollection;