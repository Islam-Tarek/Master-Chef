import { 
    FullPostInformation,
    UserInformation,
    LikesCount
 } from "../../../controller";

export interface userProfileDao{
    createUserProfile(userInfo: UserInformation): Promise<void>;
    getUserInformation(userId: string): Promise<UserInformation | undefined>;
    getUserLikes(userId: string) : Promise<LikesCount | undefined>;
    checkUserInformation(userId: string) : Promise<UserInformation | undefined>;
    getUserPostInformations(userId: string): Promise<FullPostInformation[] | undefined>
}