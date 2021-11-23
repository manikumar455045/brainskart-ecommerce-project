import express from 'express';
import { body, validationResult } from 'express-validator';
import VerifyToken from '../Middlewares/TokenVerifier';
import { IOrder } from '../Models/IOrder';
import { IUser } from '../Models/IUser';
import orderTable from '../Models/Order';
import userTable from '../Models/User';
import cors from "cors";



const orderRouter : express.Router = express.Router();

/*
@info : Place an order
@url : "http://127.0.0.1:5000/api/orders/place"
@method : post
@fields : items,tax,total
@access : private
*/

orderRouter.post('/place' , VerifyToken , [
    body('items').not().isEmpty().withMessage('No items are present'),
    body('tax').not().isEmpty().withMessage('Tax should npt be empty'),
    body('total').not().isEmpty().withMessage('total should not be empty'),
], async (request : express.Request , response : express.Response) => {
    try{
        let errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(401).json({errors : errors.array()});
        }
        let {items , tax, total} = request.body;
        let user  : any = request.headers['user'];
        // @ts-ignore
        let requestUser : IUser = await userTable.findById(user.id);
        let order : IOrder = new orderTable({
            name : requestUser.name,
            email : requestUser.email,
            mobile : requestUser.address.phone,
            items : items,
            tax : tax,
            total : total
        })
        order = await order.save();
        response.status(200).json({msg : "Order placed successfully" , order : order});
    }
    catch(error){
        console.error(error);
        response.status(500).json({
            errors: [
                {
                    msg: error
                }
            ]
        });
    }
})

/*
@info : get all orders
@url : "http://127.0.0.1:5000/api/orders"
@method : get
@fields : no-fields
@access : private
*/

orderRouter.get('/' , VerifyToken , async (request : express.Request , response : express.Response) => {
    try{
        let user  : any = request.headers['user'];
        // @ts-ignore
        let requestUser : IUser = await userTable.findById(user.id);
        let orders : IOrder[] = await orderTable.find({email : requestUser.email});
        /*console.log(orders)*/
        response.status(200).json({orders: orders});
    }
    catch(error){
        console.error(error);
        response.status(500).json({
            errors: [
                {
                    msg: error
                }
            ]
        });
    }  
})


export default orderRouter;