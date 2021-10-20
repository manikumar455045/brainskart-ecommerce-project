import mongoose, { Model, Schema } from 'mongoose';
import { IOrder } from './IOrder';

let orderSchema : Schema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true},
    mobile : {type : Number , required : true},
    tax : {type : Number , required : true },
    total : {type : Number , required : true},
    items : [
        {
            name : {type : String , required : true},
            brand : {type : String , required : true},
            qty : {type : Number , required : true},
            price : {type : Number , required : true}
        }
    ]
} , {timestamps : true});

const orderTable : Model<IOrder> = mongoose.model( 'Order', orderSchema);
export default orderTable