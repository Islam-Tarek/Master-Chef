export enum ERRORS {

    // User Errors
    USER_FIELDS_REQUIRED = 'Email, password, userName, fisrtName and lastName are REQUIRED',
    DUPLICATE_EMAIL = 'There is already exists an account with this EMAIL',
    DUPLICATE_USERNAME = 'There is already exists an account with this USERNAME',
    USER_NOT_FOUND = 'The User is NOT FOUND',
    SINGING_IN_FIELDS_REQUIRED = 'password and (userName OR email) is REQUIRED',
    WRONG_PASSWORD = 'The pasword is WRONG',


    // Post Errors
    POST_FIELDS_REQUIRED = 'title and content are REQUIRED',
    DUPLICATE_CONTENT = 'There is already exists an post with this CONTENT',


    // Comment Errors
    COMMENT_FIELD_REQUIRED = 'comment filed is REQUIRED',
    POST_ID_MISSING = 'The post id is not fouded',
    COMMENT_ID_MISSING = 'The comment id is not founded',


    // Like Errors
    


    // Auth Errors
    BAD_TOKEN  = 'Bad token',
    EXPIRED_TOKEN = 'The token is EXPIRED',


    // General Errors
    UNEXPECTED_ERROR = 'Unexprected error occurred , please try again',
    UNCAUGHT_ERROR = 'Uncaught error',
    

}