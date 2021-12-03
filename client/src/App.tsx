import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter , Switch , Route} from 'react-router-dom'
import Navbar from './Modules/layout/components/navbar/Navbar';
import Home from './Modules/layout/components/home/Home';
import Cart from './Modules/orders/components/cart/Cart';
import Checkout from './Modules/orders/components/checkout/Checkout';
import OrderList from './Modules/orders/components/order-list/OrderList';
import OrderSuccess from './Modules/orders/components/order-success/OrderSuccess';
import UserLogin from './Modules/users/components/login/UserLogin';
import UserRegister from './Modules/users/components/register/UserRegister';
import UploadProduct from './Modules/products/components/upload-product/UploadProduct';
import WomensCollection from './Modules/products/components/womens-collection/WomensCollection';
import KidsCollection from './Modules/products/components/kids-collection/KidsCollection';
import MensCollection from './Modules/products/components/mens-collection/MensCollection';
import Alert from "./Modules/layout/components/alert/Alert";
import UserProfile from "./Modules/users/components/profile/UserProfile";
import PrivateRoute from "./router/PrivateRoute";
import * as userActions from "./redux/users/user.action";
import {useDispatch} from "react-redux";
import ProductDetail from "./Modules/products/components/product-details/ProductDetail";
import Footer from "./Modules/layout/components/home/Footer";
let App = () => {
    let dispatch =useDispatch();
    useEffect(() => {
        dispatch(userActions.getUserInfo())
    },[])
 return (
   <React.Fragment>
     <BrowserRouter>
     <Navbar />
         <Alert/>
     <Switch>
     <Route exact path="/" component={Home}/>
             <Route exact path="/products/men" component={MensCollection}/>
             <Route exact path="/products/kids" component={KidsCollection}/>
             <Route exact path="/products/women" component={WomensCollection}/>
             <PrivateRoute exact path="/products/upload" component={UploadProduct}/>
             <Route exact path="/products/:productId" component={ProductDetail}/>
             <PrivateRoute exact path="/orders/cart" component={Cart}/>
             <Route exact path="/orders/list" component={OrderList}/>
             <PrivateRoute exact path="/orders/checkout" component={Checkout}/>
             <Route exact path="/orders/success" component={OrderSuccess}/>
             <Route exact path="/users/login" component={UserLogin}/>
             <Route exact path="/users/register" component={UserRegister}/>
         <PrivateRoute exact path="/users/profile" component={UserProfile}/>
     </Switch>
         <Footer/>
     </BrowserRouter>
   </React.Fragment>
 ) 
}

export default App;
