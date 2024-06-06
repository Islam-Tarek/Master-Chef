import  {
    FullPostInformation,
     Post
} from "../../../server";

export interface PostDao {
    listPosts() : Promise<Post[] | undefined>;
    createPost(post: Post) : Promise<void>;
    getPost(id: string) : Promise<Post | undefined>;
    getPostByContent(content: string): Promise<Post | undefined>;
    deletePost(id: string) : Promise<void>;
    getPostInformations(postId: string): Promise<FullPostInformation | undefined>
    getAllPostsInformations(): Promise<FullPostInformation[] | undefined>
}
