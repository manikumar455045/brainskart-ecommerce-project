import {Document} from 'mongoose'

export interface IAddress {
    flat : string,
    street : string,
    landmark : string,
    city : string,
    state : string,
    country : string,
    pin : number,
    phone : number
}

export interface IUser extends Document{
    _id? : string,
    name : string,
    email : string,
    password : string,
    avatar : string,
    isAdmin : boolean,
    address : IAddress,
    createdAt? : string,
    updated? : string
}