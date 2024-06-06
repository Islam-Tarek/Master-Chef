import { 
    userProfileDao, 
    CommentDao,
    LikeDao,
    PostDao,
    UserDao
} from "./DAO";
import { SqlDataStore } from "./sql";

export interface DataStore extends UserDao, PostDao, LikeDao, CommentDao, userProfileDao {}

export let db : DataStore;

export async function initdb(){
    db = await new SqlDataStore().openDB();
} 