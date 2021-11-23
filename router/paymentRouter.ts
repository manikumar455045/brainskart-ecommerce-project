import express from 'express';
import VerifyToken from "../Middlewares/TokenVerifier";
import cors from "cors";
import userTable from "../Models/User";
import {IUser} from "../Models/IUser";
import {v4} from "uuid";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY as string)

const paymentRouter : express.Router = express.Router();

/*
@info : payments
@url : "http://127.0.0.1:5000/api/orders/pay"
@method : post
@fields : paymentBody
@access : private
*/
paymentRouter.post("/checkout" , VerifyToken , cors() , async (request : express.Request , response : express.Response) => {
    try{
        let paymentBody = request.body;
        const idempotencyKey = v4();
        let payUser : any = request.headers['user']
        // @ts-ignore
        let requser  : IUser  = await userTable.findById(payUser.id);
        stripe.customers.create({
            name : paymentBody.customer.name,
            address : requser.address,
            description : paymentBody.description,
            email: paymentBody.email,
            source: paymentBody.source
        }).then((customer : any) => stripe.charges.create(
            {
                amount : paymentBody.product.amount,
                currency: paymentBody.product.currency,
                customer: customer.id,
                description: paymentBody.description,
            },
            {
                idempotencyKey,
            }
        )).then((charge: any) => response.status(200).json(charge))
            .catch((err: any) => console.error(err))
        response.status(200).json({msg : 'payment is success'});
    }
    catch(error){
        console.error(error);
        response.status(200).json({errors : [{msg : error}]});
    }
})

export default paymentRouter;