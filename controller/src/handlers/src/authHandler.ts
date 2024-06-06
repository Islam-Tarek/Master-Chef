import crypto from "crypto";
import { signJwt } from "../../auth";
import { db } from "../../../../model";
import {
    SignInRequest,
    SignInResponse,
    SignUpRequest,
    SignUpResponse, 
    SignOutRequest,
    SignOutResponse,
    ExpressHandler,
    ERRORS,
    User
} from "../../shared"

export const signInHandler: ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    if(!login || !password){
        return res.status(400).send({error:ERRORS.SINGING_IN_FIELDS_REQUIRED});
    }   

    const existing = await logingInfoValidation(login);
    if(!existing){
        return res.status(403).send({error: ERRORS.USER_NOT_FOUND});
    }
    if(existing.password !== hashPassword(password)){
        return res.status(403).send({error: ERRORS.WRONG_PASSWORD});
    }

    const userId = existing.id
    const jwt = signJwt({userId:userId})

    const firstTime = await db.checkUserInformation(userId);
    if(firstTime === undefined){
       return res.cookie('token', jwt,{
            httpOnly:true,
            path:"/",
            maxAge: 7 * 24 * 60 * 60 * 1000
            })
           .status(200)
           .redirect('/createuserprofile');
    }
    
    
    return res.cookie('token', jwt, {
                httpOnly:true,
                path:"/",
                maxAge: 7 * 24 * 60 * 60 * 1000
                })
             .status(200)
            .redirect('/homepage');
};


export const signUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
     
    const userName = req.body.userName;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;    
    if(!userName || !password || !email || !firstName || !lastName){
        return res.status(400).send({error:ERRORS.USER_FIELDS_REQUIRED});
    }

    if(await emailValidation(email)){
        return res.status(403).send({error: ERRORS.DUPLICATE_EMAIL});
    }
    if(await userNameValidation(userName)){
        return res.status(403).send({error: ERRORS.DUPLICATE_USERNAME});
    }
  
    const NewUser : User = {
        id: crypto.randomUUID(),
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        password:hashPassword(password),
        email: email
    };
    
    await db.createUser(NewUser);
    
    return res.status(200)
               .redirect('/masterchef');
}


export const signOutHandler: ExpressHandler<SignOutRequest, SignOutResponse> = async (req, res) =>{
    try{        
        res.clearCookie('token')
            .status(200)
            .redirect('/masterchef');
        }catch{
        res.status(400).send({error:'failed to delete token'});
        }
}

function hashPassword(password: string): string {
    return crypto.pbkdf2Sync(
        password,
        process.env.SALT_PASSWORD! ,
        101 ,
        80 ,
        'sha512')
        .toString('hex');
}

const  logingInfoValidation = async (login: string): Promise<User> => {
    return new Promise(async (resolve, reject) => {

        const data = [db.getUserByEmail(login), db.getUserByUsername(login)];
        
        const result = await Promise.all(data);
        if(result[0]){
            resolve(result[0]);
        }else if(result[1]){
            resolve(result[1]);
        }
        else {
            reject();
        }
    });
}

const emailValidation = async (email: string) => {
    return db.getUserByEmail(email);
}

const userNameValidation = async (userName: string) => {
    return db.getUserByUsername(userName);
}
