import  crypto from "crypto";
import { 
    CreateLikeRequest,
    CreateLikeResponse,
    ExpressHandler,
    Like,
} from "../../shared";
import { db } from "../../../../model";

export const likeHandler: ExpressHandler<CreateLikeRequest, CreateLikeResponse> = async (req, res) =>{
    const postId = req.url.split('/').pop()!;
    const userId = res.locals.userId;

    try{
        const newLike: Like = {
            id: crypto.randomUUID(),
            postId: postId,
            userId: userId
        }

        const isLiked = await db.checkLike(newLike);
        let updateLikesCount = await db.getLikesCountToPost(postId);

        if(isLiked === undefined){
            await db.createLike(newLike);
            if(updateLikesCount !== undefined){
                const likesCount = updateLikesCount!.length + 1;
                return res
                        .send({likesCount: likesCount });
            }
        }else{
            if(updateLikesCount !== undefined){
                await db.deleteLike(postId, userId);
                const likesCount = updateLikesCount.length - 1;                
                return res.send({likesCount: likesCount });
            }
        }
    }catch{
        return res.sendStatus(400);
    }
}

