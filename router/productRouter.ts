import express, {request} from 'express';
import VerifyToken from "../Middlewares/TokenVerifier";
import {body , validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import {IProduct} from "../Models/IProduct";
import productTable from "../Models/product";

const productRouter : express.Router = express.Router();

/*
@info : Upload a Product
@url : "http://127.0.0.1:5000/api/products/upload"
@method : post
@fields : name,brand, price, qty, image, category, description, usage
@access : private
*/

productRouter.post('/upload' , VerifyToken , [
  body('name').not().isEmpty().withMessage("Product name is required"),
  body('brand').not().isEmpty().withMessage("Brand name is required"),
  body('price').not().isEmpty().withMessage("price is required"),
  body('qty').not().isEmpty().withMessage("Quantity is required"),
  body('image').not().isEmpty().withMessage("image is required"),
  body('category').not().isEmpty().withMessage("Category name is required"),
  body('description').not().isEmpty().withMessage("Description is required"),
  body('usage').not().isEmpty().withMessage("Usage is required")
] , async (request : express.Request , response : express.Response) => {
    try{
        let errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(401).json({errors : errors.array()});
        }

        let {name, brand, price, qty, image, category, description, usage } = request.body;

        let newProduct : IProduct = await productTable.create({name , brand , price, qty, image , category, description , usage });

        response.status(200).json({msg : 'Product created successfully'})
    }
    catch (error) {
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
@info : get mens wear
@url : "http://127.0.0.1:5000/api/products/men"
@method : get
@fields : none
@access : public
*/

productRouter.get('/men' , async (request : express.Request, response : express.Response) =>{
    try{
        let products : IProduct[] = await productTable.find({category : 'MEN'});
        response.status(200).json({
            products : products
        });
    }
    catch (error) {
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
@info : get womens wear
@url : "http://127.0.0.1:5000/api/products/women"
@method : get
@fields : none
@access : public
*/

productRouter.get('/women' , async (request : express.Request, response : express.Response) =>{
    try{
        let products : IProduct[] = await productTable.find({category : 'WOMEN'});
        response.status(200).json(products);
    }
    catch (error) {
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
@info : get kids wear
@url : "http://127.0.0.1:5000/api/products/kids"
@method : get
@fields : none
@access : public
*/

productRouter.get('/kids' , async (request : express.Request, response : express.Response) =>{
    try{
        let products : IProduct[] = await productTable.find({category : 'KIDS'});
        response.status(200).json(products);
    }
    catch (error) {
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
@info : get Product
@url : "http://127.0.0.1:5000/api/products/:productId"
@method : get
@fields : none
@access : public
*/
productRouter.get('/:productId' , async  (request : express.Request, response : express.Response)=>{
    try{
        let productId = request.params.productId;
        let product : IProduct = await productTable.findById(productId);
        if(!product){
            return response.status(404).json({msg : 'Product not Found'})
        }
        return response.status(200).json(product);
    }
    catch (error) {
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

export default productRouter;