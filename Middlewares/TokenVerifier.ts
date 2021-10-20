import express from 'express';
import jwt from 'jsonwebtoken';

const VerifyToken = (request : express.Request , response : express.Response , next : express.NextFunction) => {
    let token : any = request.header('x-auth-token');

    if(!token){
        return response.status(401).json({errors : [{msg : 'NO Token Provided, Access Denied'}]});
    }
    try{
        console.log("token verified")
        let decode : any = jwt.verify(token , process.env.JWT_SECRET_KEY as string);
        request.headers['user'] = decode.user;
        next();
    }
    catch (error) {
        console.error({msg : 'Invalid Token Provided'});
        return response.status(401).json({errors : [{msg : 'Invalid Token Provided'}]});
    }
}

export default VerifyToken;