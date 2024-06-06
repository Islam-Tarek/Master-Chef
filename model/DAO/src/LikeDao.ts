import { Like } from "../../../server";

export interface LikeDao{
    createLike(like: Like) : Promise<void>;
    checkPostLikes(postId: string) : Promise<Like | undefined>;
    checkLike(like: Like) : Promise<Like | undefined>;
    getLikesCountToPost(postId: string): Promise<Like[] | undefined>;
    deleteLike(postId: string, userId : string): Promise<void>;
    deleteAllLikesToPost(postId: string):Promise<void>;
}