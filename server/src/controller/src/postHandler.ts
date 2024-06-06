import crypto from 'crypto';
import createDomPurify from 'dompurify';
import {JSDOM} from 'jsdom';
import {marked} from 'marked';
import { db } from '../../../../model';
import { 
    ERRORS,
    CreatePostRequset,
    CreatePostResponse,
    DeletePostRequest,
    DeletePostResponse,
    GetPostRequset,
    GetPostResponse,
    ListPostsRequest,
    ListPostsResponse,
    ExpressHandler,
    Post
} from '../../../src/shared';


const dompurify = createDomPurify(new JSDOM().window)

export const listPostsHandler : ExpressHandler<ListPostsRequest, ListPostsResponse>  = async (_req, res) =>{
    const activeUserId = res.locals.userId;
    const firstTime = db.checkUserInformation(activeUserId);
    if(firstTime === undefined){
        return res.render('pages/createProfile.ejs');
    }

    try {
        const posts = await db.listPosts();
            if(posts){
                const postsInformations = await db.getAllPostsInformations();
                return res.status(200)
                          .render(
                                'pages/homePage.ejs',
                                {posts:postsInformations, activeUserId:activeUserId}
                            );
            }
    } catch (err) {
        console.error('Error fetching posts:', err);
        return res.sendStatus(500); 
      }
}

export const createPostHandler : ExpressHandler<CreatePostRequset, CreatePostResponse> = async (req, res) =>{
    const title = req.body.title;
    const content = req.body.content;
    if(!content || !title){
        return res.status(400)
                  .send({error: ERRORS.POST_FIELDS_REQUIRED});
    } 

    let markedContent = await marked(content);
    let sanitizedHtmlContent = dompurify.sanitize(markedContent);


    // checking if there is an image source in this post (to resize the image) 

    let originalContent = sanitizedHtmlContent;

    // Regular expression to match <img> tags
    let regex = /<img\b(.*?)(\/?>)/g;

    // Replace each <img> tag with the new width and height attributes
    let newContent = originalContent.replace(regex, (_match, p1, p2) => {
        // Check if the width and height attributes already exist
        let widthExists = /width\s*=\s*"\d+"/.test(p1);
        let heightExists = /height\s*=\s*"\d+"/.test(p1);

        // Add or replace the width and height attributes
        let newAttributes = p1;
        if (widthExists) {
            newAttributes = newAttributes.replace(/width\s*=\s*"\d+"/, 'width="50"');
        } else {
            newAttributes = ` width="1200"` + newAttributes;
        }

        if (heightExists) {
            newAttributes = newAttributes.replace(/height\s*=\s*"\d+"/, 'height="50"');
        } else {
            newAttributes = ` height="900"` + newAttributes;
        }

        return `<img${newAttributes}${p2}`;
    });

    const post: Post = {
        id: crypto.randomUUID(),
        title: title,
        content: newContent,
        userId: res.locals.userId,
        postedAt: (new Date()).toLocaleString()
    }

    await  db.createPost(post);
    return res.status(200)
              .redirect('/homepage');
}


export const getPostHandler: ExpressHandler<GetPostRequset,GetPostResponse> = async (req, res) =>{
    const postId = req.url.split('/').pop()!;
    if(!postId){
        return res.status(400)
                  .send({error: 'can not get the postId'});

    }
    const activeUserId = res.locals.userId;
    try{
        const getPost = await db.getPostInformations(postId);
        if(!getPost){
            return res.status(400)
                      .send({error: ERRORS.POST_ID_MISSING});
        }

        const comments = await db.getAllCommentsToPost(postId);

        return res.status(200)
                  .render( 'pages/getPost.ejs', 
                            { 
                                post:getPost,
                                comments:comments,
                                activeUserId:activeUserId
                            }
                        );
    }
    catch{
        return res.status(400)
                  .send({error: 'can not get the post'});
    }
}


export const deletePostHandler: ExpressHandler<DeletePostRequest,DeletePostResponse> = async (req, res) =>{
    const postId = req.url.split('/').pop();

    if(!postId){
        return res.status(400)
                  .send({error: 'can not get the postId'});
    }
    const checkPostLikes = await db.checkPostLikes(postId);
    if(checkPostLikes !== undefined){
        await db.deleteAllLikesToPost(postId);
    }
    const checkPostComments = await db.checkComment(postId);
    if(checkPostComments){
        await db.deleteAllCommentsToPost(postId);
    }

    try{
        await db.deletePost(postId);
       res.redirect('/homepage');
    }catch{
        return res.status(400)
                  .send({error: 'can not delete the post'});
    }
}