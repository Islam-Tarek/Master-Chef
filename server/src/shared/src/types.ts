import { RequestHandler } from "express";

export interface User {
   id: string,
   firstName: string,
   lastName: string,
   userName: string,
   password: string,
   email: string
}

export interface Post {
   id: string,
   title: string,
   content:string,
   userId: string,
   postedAt: string
}

export interface Like {
   id:string,
   userId: string,
   postId: string
}


export interface Comment {
   comment: string,
   id: string,
   userId: string
   postId: string,
   postedAt: string
}

export interface UserInformation{
   userId: string,
   joinedAt: string,
   about: string
}

export interface FullPostInformation{
   id: string,
   firstName: string,
   lastName: string,
   title: string,
   content:string,
   userId: string,
   postedAt: string,
}

export interface FullPostCommentsInformations{
   id: string,
   firstName: string,
   lastName: string,
   comment: string,
   userId: string,
   postedAt: string
}

export interface LikesCount{
   userId: string,
   likesCount: number
}


type withError<T> = T & {error: string}

export type ExpressHandler < Req, Res> = RequestHandler<
    string,
    Partial<withError<Res>>,
    Partial<Req>,
    any
 >;

export type ExpressHandlerWithParams<params, Req, Res> = RequestHandler<
   Partial<params>,
   Partial<Res>,
   Partial<Req>,
   any
>;

 export interface JwtObject{
    userId: string;
 }