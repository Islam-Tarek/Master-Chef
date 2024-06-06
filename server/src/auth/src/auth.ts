import jwt from "jsonwebtoken";
import { JwtObject } from "../../shared";
import { getJwtSecretKey } from "./env";


export function signJwt (obj: JwtObject): string {
   return jwt.sign(obj, getJwtSecretKey());
}

export function verifyJwt (token: string): JwtObject {
    return jwt.verify(token, getJwtSecretKey()) as JwtObject;
}
