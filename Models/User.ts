import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
    name : {type : String , required : true },
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true},
    avatar : {type : String , required : true},
    isAdmin : {type : Boolean , default : false},
    address : {
        flat : {type : String},
        street : {type : String},
        landmark : {type : String},
        city : {type : String},
        state : {type : String},
        country : {type : String},
        pin : {type : Number},
        phone : {type : Number}
    }
},{timestamps : true});

const userTable =  mongoose.model('user',UserSchema);

export default  userTable;