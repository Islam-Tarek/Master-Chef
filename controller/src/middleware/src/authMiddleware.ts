import { 
    ExpressHandler,
    JwtObject,
    ERRORS
} from "../../shared";
import {  verifyJwt } from "../../auth";
import { db } from "../../../../model";
import { TokenExpiredError } from "jsonwebtoken";


export const authMiddleware: ExpressHandler <any, any> = async (req, res, next) => {
    // const token = req.headers.authorization?.split(' ')[1];
    const token = req.cookies.token;

    if(!token){
       return res.sendStatus(401);
    }

    let payload: JwtObject;
    try {
        payload = verifyJwt(token);
    }catch(err) {    
        if(err instanceof TokenExpiredError){
            return res.status(401).send({error: ERRORS.EXPIRED_TOKEN});
        }      
        return res.status(401).send({error: ERRORS.BAD_TOKEN});
    }   

    const user = await db.getUserById(payload.userId);
       if(!user){
            return res.status(403).send({error: ERRORS.USER_NOT_FOUND});
       }
       
       res.locals.userId = user.id;
       return next();
}

