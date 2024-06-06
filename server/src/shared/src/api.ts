import {
    Post,
    User,
    Comment,
    UserInformation
 } from "./types";


// post API
export type CreatePostRequset = Pick<Post, 'title'|'content'>
export interface CreatePostResponse{};

export interface ListPostsRequest {};
export interface ListPostsResponse{
    posts: Post[];
};
 
export interface GetPostRequset{};
export interface GetPostResponse{
    post: Post;
};

export interface DeletePostRequest{};
export interface DeletePostResponse{}
  

// comment API
export type CreateCommentRequest = Pick<Comment, 'comment'>;
export interface CreateCommentResponse {};

export interface ListCommentsRequest{};
export interface ListCommentsResponse{
    comments: Comment[];
};

export interface DeleteCommentRequest {};
export interface DeleteCommentResponse {};




// like API
export interface CreateLikeRequest {};
export interface CreateLikeResponse {
    likesCount: number
};

export interface DeleteLikeRequest {};
export interface DeleteLikeResponse {};




// user API
export type SignUpRequest = Pick<User, 'firstName'|'lastName'|'userName'|'email'|'password'>;
export interface SignUpResponse {
    jwt:string
};

export interface SignInRequest{
    login: string;
    password: string;
};

export type SignInResponse = {
    user: Pick<User, 'email'|'firstName'|'lastName'|'userName'|'id'>,
    jwt: string
};

export interface SignOutRequest{}
export interface SignOutResponse{}


export type UserProfileInformationRequest = Pick<UserInformation, 'about'>;
export interface UserProfileInformationResponse {};

export interface GetUserProfileInformationRequest {};
export interface GetUserProfileInformationResponse{};

export interface GetPersonalProfileRequest {};
export interface GetPersonalProfileResponse{};

export interface ListUserInformationRequest {};
export interface ListUserInformationResponse {
    userInfo: UserInformation
};