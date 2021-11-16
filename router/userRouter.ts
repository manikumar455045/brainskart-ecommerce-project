import express, {request, response} from 'express';
import userTable from "../Models/User";
import {IAddress, IUser} from "../Models/IUser";
import bcrypt from 'bcryptjs';
import jwt, {sign} from 'jsonwebtoken';
import gravatar from 'gravatar';
import {body , validationResult} from 'express-validator'
import VerifyToken from "../Middlewares/TokenVerifier";
import {LoginTicket, OAuth2Client} from 'google-auth-library'

const userRouter : express.Router = express.Router();
const client = new OAuth2Client("509138529581-4u7c810o2a9kovq85cpirkijsk1s4a88.apps.googleusercontent.com")

/*
@info : Register a user
@url : "http://127.0.0.1:5000/api/users/register"
@method : post
@fields : name, email, password
@access : public
*/

userRouter.post('/register' , [
    body('name').not().isEmpty().withMessage("Name is required"),
    body('email').not().isEmpty().withMessage("email is required"),
    body('password').not().isEmpty().withMessage("password is required"),
],async (request:express.Request , response : express.Response) => {
    try {
        const  errors = validationResult(request);
        if(!errors.isEmpty()){
            return  response.status(400).json({errors : errors.array()})
        }
        let {name, email , password} = request.body;

        //check if email exists
        let user = await userTable.findOne({email : email})
        console.log(user)
        if(user){
            return response.status(401).json({
                msg : 'User already exists'
            });
        }
        let address : IAddress = {flat : '', street : '', landmark : '', city : '', state : '', country : '', pin : 0, phone : 0}
        //encrypt password
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password , salt);

        //gravatar
        let avatar = gravatar.url(email, {
            s : '200',
            r : 'pg',
            d : 'mm'
        })

        let newUser : IUser = await userTable.create({name, email , password : hash , avatar , address});

        response.status(200).json({
            msg: `User with email ${email} Created successfully`
        })
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

});

/*
@info : login a user
@url : "http://127.0.0.1:5000/api/users/login"
@method : post
@fields : email, password
@access : public
*/

userRouter.post('/login' , [
    body('email').not().isEmpty().withMessage("email is required"),
    body('password').not().isEmpty().withMessage("password is required")
] ,async (request : express.Request , response : express.Response) => {
    try {
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(401).json({errors : errors.array()});
        }
        let { email, password} = request.body;
        //check user
        let user = await userTable.findOne({email : email});
        if(!user){
            return response.status(401).json({msg : 'user does not exist'});
        }
        //check password
        let isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return response.status(401).json({msg : 'Incorrect Password'});
        }
        // generate jwt token
        let payload = {
            user : {
                id : user._id,
                name : user.name
            }
        }
        jwt.sign(payload , process.env.JWT_SECRET_KEY as string ,(err , token) => {
            if(err) throw err;
            response.status(200).json({
                msg : 'Login is success',
                token : token
            })
        })
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
@info : Get user info
@url : "http://127.0.0.1:5000/api/users/"
@method : get
@fields :
@access : private
*/

userRouter.get('/' , VerifyToken , async (request : express.Request , response : express.Response) => {
    try{
        let id : any = request.headers['user'];
        let user : IUser = await userTable.findById(id.id);
        response.status(200).json(user);
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

userRouter.post('/address' , VerifyToken , [
    body('flat').not().isEmpty().withMessage('Flat is required'),
    body('street').not().isEmpty().withMessage('Street is required'),
    body('landmark').not().isEmpty().withMessage('Landmark is required'),
    body('city').not().isEmpty().withMessage('City is required'),
    body('state').not().isEmpty().withMessage('State is required'),
    body('country').not().isEmpty().withMessage('Country is required'),
    body('pin').not().isEmpty().withMessage('Pin is required'),
    body('phone').not().isEmpty().withMessage('Phone is required'),
] , async (request : express.Request , response : express.Response) => {
    let error = validationResult(request);

    if(!error.isEmpty()){
        return response.status(401).json({errors : error.array()});
    }

    let { flat,street , landmark , city , state , country , pin , phone } = request.body;

    let newAddress : IAddress = {flat : flat, street : street, landmark : landmark, city : city, state : state, country : country, pin : pin, phone : phone}
    let reqUser : any = request.headers['user'];
    let user = await userTable.findById(reqUser.id);
    user.address = newAddress;
    await user.save(); // update to database
    response.status(200).json({msg : 'Address is updated'})
})

//GoogleLogin
userRouter.post("/GoogleLogin" , async (request : express.Request , response : express.Response) => {
    const { tokenID } = request.body;
    console.log(tokenID)
    client.verifyIdToken({idToken : tokenID , audience : "509138529581-4u7c810o2a9kovq85cpirkijsk1s4a88.apps.googleusercontent.com"}).then(async (gresponse) => {
        let GoogleUser: any = gresponse.getPayload();
        let {email_verified , email , name , picture} = GoogleUser;
        if(email_verified){
            let user : IUser = await userTable.findOne({email : email})
            if(user){
                console.log("true")
                //user already logged in before with gmail
                let payload = {
                    user: {
                        id: user._id,
                        name: user.name
                    }
                }
                    jwt.sign(payload , process.env.JWT_SECRET_KEY as string , (err , token) => {
                        if (err) throw err;
                        response.status(200).json({
                            token : token,
                            msg : 'Login is success'
                        })

                    })
                }
        else{
            //user clicks google login for first time. so we need to create new user and generate token
                let address : IAddress = {flat : '', street : '', landmark : '', city : '', state : '', country : '', pin : 0, phone : 0}
                let avatar = picture;
                let password = name+email;
                let salt = await bcrypt.genSalt(10);
                let hash = await bcrypt.hash(password , salt);
                let newUser : IUser = new userTable({name : name, email : email , password : hash , avatar : avatar , address : address});
                await newUser.save();
                let payload = {
                    user : {
                        id : newUser._id,
                        name : newUser.name
                    }
                }
                jwt.sign(payload , process.env.JWT_SECRET_KEY as string , (err , token) => {
                    if (err) throw err;
                    response.status(200).json({
                        token : token,
                        msg : 'Login is success'
                    })

                })


            }
        }
    }).catch((error) => {
        response.status(500).json({
            msg : "Something went wrong"
        })
    })
})


export default userRouter;