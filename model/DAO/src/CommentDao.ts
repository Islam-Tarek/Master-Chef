import { 
    FullPostCommentsInformations,
     Comment
} from "../../../controller";

export interface CommentDao {
    createComment(comment: Comment) : Promise<void>;
    listComments(postId : string) : Promise<Comment [] | undefined>;
    getAllCommentsToPost(postId: string): Promise<FullPostCommentsInformations[] | undefined>
    getCommentById(id: string) : Promise<Comment | undefined>
    deleteComment(postId: string) : Promise<void>;
    deleteAllCommentsToPost(postId: string) : Promise<void>;
    checkComment(postId: string): Promise<Comment|undefined>;
}