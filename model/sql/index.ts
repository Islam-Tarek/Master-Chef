import sqlite3 from 'sqlite3';
import path from "path";
import { DataStore } from "..";
import {
    open as openSqlite,
     Database
} from 'sqlite';
import { 
    FullPostCommentsInformations,
    FullPostInformation, 
    UserInformation,
    LikesCount, 
    Comment, 
    User, 
    Post, 
    Like
} from "../../server/index";

export class SqlDataStore implements DataStore {
  
    private db!: Database<sqlite3.Database, sqlite3.Statement>;

    public async openDB(){
         this.db = await openSqlite({
            filename: path.join( __dirname, 'masterchef.sqlite'),
            driver: sqlite3.Database,
        });

        this.db.run('PRAGMA foreign_keys = ON;');

        await this.db.migrate({
            migrationsPath: path.join(__dirname,'migrations'),
        });
        return this;
    }

     
     async getUserById(userId: string): Promise<User | undefined> {
        return this.db.get("SELECT * FROM users WHERE id = ?", userId);
    }

     async createUser(user: User): Promise<void> {
        this.db.run("INSERT INTO users(id, firstName, lastName, email, userName, password ) VALUES (?,?,?,?,?,?)",
            user.id,
            user.firstName,
            user.lastName,
            user.email,
            user.userName,
            user.password
        );
    }
    
     async getUserByEmail(email: string): Promise<User | undefined> {
        return this.db.get<User>("SELECT * FROM users WHERE email = ?", email);
    }

     async getUserByUsername(username: string): Promise<User | undefined> {
        return this.db.get<User>("SELECT * FROM users WHERE userName = ?", username);
    }

     async listPosts(): Promise<Post[] | undefined> {
        return this.db.all<Post[]>("SELECT * FROM posts  ORDER BY postedAt DESC");
    }

     async createPost(post: Post): Promise<void> {
        this.db.run("INSERT INTO posts(id, title, content, userId, postedAt) VALUES (?,?,?,?,?)",
            post.id,
            post.title,
            post.content,
            post.userId,
            post.postedAt
        );
    }
    
    async getPostByContent(content: string): Promise<Post | undefined> {
        return this.db.get<Post>(`SELECT * FROM posts WHERE content = ?`, content);
    }

    async getPost(id: string): Promise<Post | undefined> {
       return this.db.get<Post>(`SELECT * FROM posts WHERE id = ?`, id);
   }

    async deletePost(id: string): Promise<void> {
        this.db.run(`DELETE FROM posts WHERE id = ?`, id);
  }

  async getCommentById(id: string): Promise<Comment | undefined> {
    return this.db.get<Comment>(`SELECT * FROM comments WHERE id = ?`, id)
  }
  
     async createComment(comment: Comment): Promise<void> {
        this.db.run("INSERT INTO comments (id, userId, postId, comment ,postedAt) VALUES (?,?,?,?,?)",
            comment.id,
            comment.userId,
            comment.postId,
            comment.comment,
            comment.postedAt
    );}
    
     async listComments(id: string): Promise<Comment[] | undefined> {
        return this.db.all<Comment[]>(`SELECT * FROM comments WHERE postId = ?`, id);
    }

    async deleteComment(id: string): Promise<void> {
        this.db.run('DELETE FROM comments WHERE id = ?', id);
    }

    async createLike(like: Like): Promise<void> {
        this.db.run(`INSERT INTO likes (id, userId, postId) VALUES (?,?,?)`,like.id, like.userId, like.postId);
    }

    async deleteLike(postId: string, userId: string): Promise<void> {
        this.db.run("DELETE FROM likes WHERE postId = ? AND userId = ?", postId, userId);
   }
   
   async checkPostLikes(postId: string): Promise<Like | undefined> {
    return this.db.get<Like>('SELECT * FROM likes WHERE postId = ?', postId);
   }
   async checkLike(like: Like): Promise<Like | undefined> {
       return this.db.get<Like>('SELECT * FROM likes WHERE userId = ? AND postId = ?', like.userId, like.postId);
   }

   async getAllPostsInformations(): Promise<FullPostInformation[] | undefined> {
        return this.db.all<FullPostInformation[]>(`
        SELECT p.id, p.title, p.content, p.userId, p.postedAt, u.firstName, u.lastName,
            COUNT(DISTINCT l.id) AS count_likes,
            COUNT(DISTINCT c.id) AS count_comments
        FROM posts AS p
        LEFT JOIN
            users AS u ON (p.userId = u.id)
        LEFT JOIN
            likes AS l ON (p.id = l.postId)
        LEFT JOIN
            comments AS c ON (p.id = c.postId)
        GROUP BY p.id, p.title, p.content, p.userId, p.postedAt, u.firstName, u.lastName
        ORDER BY p.postedAt DESC
        `);
}

    async getPostInformations(postId: string): Promise<FullPostInformation | undefined> {
        return this.db.get<FullPostInformation>(`
        SELECT p.id, p.title, p.content, p.userId, p.postedAt, u.firstName, u.lastName,
            COUNT(DISTINCT l.id) AS count_likes,
            COUNT(DISTINCT c.id) AS count_comments
        FROM posts AS p
        LEFT JOIN 
		    users AS u ON (p.userId = u.id)
        LEFT JOIN
		    likes AS l ON (p.id = l.postId)
        LEFT JOIN 
		    comments AS c ON (p.id = c.postId)
        GROUP BY p.id, p.title, p.content, p.userId, p.postedAt, u.firstName, u.lastName
        HAVING p.id = ?
        `, postId);
    }

    async getAllCommentsToPost(postId: string): Promise<FullPostCommentsInformations[] | undefined> {
        return this.db.all<FullPostCommentsInformations[]>(`
            SELECT c.id, c.comment, c.postedAt, c.userId, u.firstName, u.lastName FROM comments AS c
            INNER JOIN users AS u
            ON (c.userId = u.id)
            WHERE c.postId = ?
            ORDER BY c.postedAt DESC
        `, postId);
    }

    async deleteAllCommentsToPost(postId: string): Promise<void>{
         this.db.run("DELETE FROM comments WHERE postId = ?", postId);
    }

    async deleteAllLikesToPost(postId: string): Promise<void>{
         this.db.run("DELETE FROM likes WHERE postId = ?", postId);
    }

    async checkComment(postId: string): Promise<Comment | undefined> {
       return this.db.get<Comment>('SELECT * FROM comments WHERE postId = ?', postId);
    }

    async getLikesCountToPost(postId: string): Promise<Like[] | undefined> {
       return this.db.all<Like[]>('SELECT * FROM likes WHERE postId = ?', postId);
    }
   
    async createUserProfile(userInfo: UserInformation): Promise<void> {
        this.db.run(`INSERT INTO user_information (userId, about, joinedAt) VALUES (?,?,?)`,
                userInfo.userId,
                userInfo.about,
                userInfo.joinedAt
            );
    }

    async getUserLikes(userId: string): Promise<LikesCount | undefined> {
        return this.db.get(`
            SELECT p.userId, COUNT(l.postId) AS likesCount FROM posts AS p
            LEFT JOIN likes AS l
            ON (l.postId = p.id)
            WHERE p.userId = ?
            GROUP BY p.userId
        `, userId);
    }

    async getUserInformation(userId: string): Promise<UserInformation | undefined> {
        return this.db.get<UserInformation>(`
            SELECT ui.joinedAt, ui.about, u.firstName, u.lastName FROM user_information AS ui
            LEFT JOIN users AS u
            ON (ui.userId = u.id)
            WHERE ui.userId = ?
            `, userId);
    }

    async getUserPostInformations(userId: string): Promise<FullPostInformation[] | undefined> {
        return this.db.all<FullPostInformation[]>(`
        SELECT p.id, p.title, p.content, p.userId, p.postedAt, u.firstName, u.lastName,
            COUNT(DISTINCT l.id) AS count_likes,
            COUNT(DISTINCT c.id) AS count_comments
        FROM posts AS p
        LEFT JOIN 
		    users AS u ON (p.userId = u.id)
        LEFT JOIN
		    likes AS l ON (p.id = l.postId)
        LEFT JOIN 
		    comments AS c ON (p.id = c.postId)
        GROUP BY p.id, p.title, p.content, p.userId, p.postedAt, u.firstName, u.lastName
        HAVING u.id = ?
        ORDER BY p.postedAt DESC
        `, userId);
    }

    async checkUserInformation(userId: string): Promise<UserInformation | undefined> {
        return this.db.get<UserInformation>(`SELECT * FROM user_information WHERE userId = ?`, userId);
    }
}