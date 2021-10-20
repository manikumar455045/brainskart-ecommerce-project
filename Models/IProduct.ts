import Document from 'mongoose';

export interface IProduct extends Document {
    _id? : string
    name : string,
    brand : string,
    price : number,
    qty : number,
    image : string,
    category : string,
    description : string,
    usage : string,
    createdAt ?: string,
    updatedAt ?: string
}