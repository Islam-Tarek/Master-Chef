import express from "express";
import asyncHandler from "express-async-handler";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import {
    createUserProfileHandler,
    personalProfileHandler,
    userProfileHandler,
    createCommentHandler,
     deleteCommentHandler,
    createPostHandler,
    deletePostHandler,
    listPostsHandler,
    getPostHandler,
    signInHandler,
    signUpHandler,
    signOutHandler,
    likeHandler,
    authMiddleware,
    RequestLoggerMiddleware
} from "./server/index";
import {initdb } from "./model";
import path from "path";


(async () => {

await initdb();

const app = express();
app.use(express.json());
app.use('/css',express.static(path.join( __dirname, '/views/css')));
app.use(cors());
dotenv.config({path:__dirname + "/server/src/.env"});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


// app.use(RequestLoggerMiddleware);


/* **************************     public end points ********************************* */

// For testing
app.get("/healthz", (_req, res) => res.send({status: 'OK'}));

// sign up
app.get("/signup", (_req, res)=>{
    res.render('pages/signup.ejs');
});
app.post("/signup", asyncHandler(signUpHandler));


// sign in
app.get("/masterchef", (_req, res)=>{
    res.render('pages/signin.ejs');
}); 
app.post("/masterchef", asyncHandler(signInHandler));



// Beginning from this point This Middleware we be applyed on the next END POINTS

app.use(authMiddleware);

/* **************************     protected end points ********************************* */

// list posts

app.get("/homepage", asyncHandler(listPostsHandler));
  

// create post
app.get("/createpost", (_req, res)=>{
    res.render('pages/createPost.ejs');
});
app.post("/createpost",  asyncHandler(createPostHandler));

app.get("/getpost/:postId", asyncHandler(getPostHandler));

// create comment
app.post("/getpost/createcomment/:postId", asyncHandler(createCommentHandler));

// add/delete like
app.post("/like/:postId", asyncHandler(likeHandler))

// delete post
app.post("/deletepost/:postId", asyncHandler(deletePostHandler));

// delete comment
app.post("/deletecomment/:commentId", asyncHandler(deleteCommentHandler));

// signout 
app.get('/signout', asyncHandler(signOutHandler));

// create userprofile
app.get('/createuserprofile', (_req, res) =>{
    res.status(200).render('pages/createProfile.ejs');
});
app.post('/createuserprofile', asyncHandler(createUserProfileHandler));

// get userProfile
app.get('/userprofile/:userId', asyncHandler(userProfileHandler))

app.get('/personalprofile', asyncHandler(personalProfileHandler))

// Downmark guide
app.get('/markdownguide', (_req, res) =>{
    res.status(200).render('pages/markdownGuide.ejs');
})

  
//app.use(errorHandler);

const PORT  = process.env.PORT;
app.listen(PORT , async () =>{
    try{
        console.log(`connected successfully on PORT ${PORT}`);
        console.log(' ');
    } catch{
        console.log('failed to connect');
    }
});

})();

