import { RequestHandler } from "express";

export const RequestLoggerMiddleware: RequestHandler = (req, _res, next) =>{
    next();
}