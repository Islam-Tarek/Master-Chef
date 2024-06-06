import { 
    ExpressHandler,
    ERRORS,
    UserInformation,
    GetPersonalProfileRequest,
    GetPersonalProfileResponse,
    GetUserProfileInformationRequest,
    GetUserProfileInformationResponse,
    UserProfileInformationRequest,
    UserProfileInformationResponse, 
} from "../../shared";
import {db} from "../../../../model"



export const createUserProfileHandler: ExpressHandler<UserProfileInformationRequest,UserProfileInformationResponse> = async (req, res) => {
    let {about} = req.body;
    const userId = res.locals.userId;

    if(!userId){
        return res.status(403).send({error: ERRORS.USER_NOT_FOUND});
    }

    const hasProfile = await db.getUserInformation(userId);
    if(hasProfile !== undefined){
        res.status(500)
           .send({error: 'The user Already has profile'})
           .redirect('/homepage');
    }

    if(!about){
        about = " ";
    }
    const userInfo: UserInformation = {
        userId: userId,
        about: about,
        joinedAt: (new Date()).toLocaleString()
    }
    db.createUserProfile(userInfo);
    res.status(200)
        .redirect('/homepage');
}


export const userProfileHandler: ExpressHandler<GetUserProfileInformationRequest,GetUserProfileInformationResponse> = async (req, res) => {
    const userId = req.url.split('/').pop();
    if(userId === undefined){
        return res.sendStatus(500);
    }

    const userInformation = await db.getUserInformation(userId);
    const userPosts = await db.getUserPostInformations(userId);
    const userLikes = await db.getUserLikes(userId);

    const activeUserId = res.locals.userId;

    try{
        res.status(200)
            .render(
                'pages/userProfile.ejs',
                {
                    userInformation:userInformation,
                    posts: userPosts,
                    likesCount: userLikes?.likesCount,
                    activeUserId: activeUserId
                }
            );
    }catch{
        console.log('Error: while rendring user-profile-page and sending the data');
        res.sendStatus(400);
    }

}


export const personalProfileHandler : ExpressHandler<GetPersonalProfileRequest, GetPersonalProfileResponse> = async (_req, res) => {
    const userId = res.locals.userId;
    res.status(200)
        .redirect(`/userprofile/${userId}`);
}