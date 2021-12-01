import express, {request} from "express";
import cors from "cors";
import dotEnv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./router/userRouter";
import productRouter from "./router/productRouter";
import orderRouter from "./router/orderRouter";
import paymentRouter from "./router/paymentRouter";
import bodyParser from "body-parser";


const app : express.Application = express();


//configure dotenv
dotEnv.config({
    path : './.env'
});

//configure mongodb

let dbUrl : string | undefined= process.env.MONGO_DB_CLOUD_LOCAL;
if(dbUrl){
    mongoose.connect(dbUrl, {
        useCreateIndex : true,
        useFindAndModify : false,
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then(() => {
        console.log("Connected to MongoDB successfully");
    }).catch((error) => {
        console.log(error);
        process.exit(1);
    })

}

//configure express to receive form data
app.use(express.json());
//configure cors
app.use(cors());

app.use(bodyParser({limit: '50mb'}));

const port = process.env.PORT || 5000;

app.get('/' , (request : express.Request, response : express.Response ) => {
    response.status(200).send("<h2>Welcome To Brains kart backend REST API</h2>")
});

//configure router

app.use('/api/users' , userRouter);
app.use('/api/products' , productRouter);
app.use('/api/orders' , orderRouter);
app.use('/api/payments' , paymentRouter);

//listen to port
app.listen(port , ()=> {
    console.log(`Express server is connected at port : ${port}`)
})