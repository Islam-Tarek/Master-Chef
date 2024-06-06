import { 
    CreateCommentRequest,
    CreateCommentResponse,
    DeleteCommentRequest,
    DeleteCommentResponse,
    ExpressHandler,
    ERRORS,
    Comment
} from "../../shared";
import { db } from "../../../../model";

export const createCommentHandler: ExpressHandler<CreateCommentRequest,CreateCommentResponse> = async(req, res) => {
    const postId = req.url.split('/').pop()!;
    if(!postId){
        return res.status(400).send({error:ERRORS.POST_ID_MISSING});
     }
 
    const commentContent = req.body.comment;
    if(!commentContent){
       return res.status(401).send({error: ERRORS.COMMENT_FIELD_REQUIRED});
    }

    const newComment: Comment = {
        comment: commentContent,
        id: crypto.randomUUID(),
        userId: res.locals.userId,
        postId:postId,
        postedAt: (new Date()).toLocaleString()
    }

    await db.createComment(newComment);
    
    try{
        return res.redirect(`/getpost/${postId}`);
    }
    catch(e){
        console.log(e);
    }
}


export const deleteCommentHandler: ExpressHandler<DeleteCommentRequest,DeleteCommentResponse> = async (req, res) => {
    const commentId = req.url.split('/').pop();
    if(!commentId){
        return res.status(404).send({error: ERRORS.COMMENT_ID_MISSING})
    }

    await db.deleteComment(commentId);

    return res.status(200)
            .redirect(`/homepage`);
}
