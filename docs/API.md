## HTTP REQUESTS


### GET


| PATH                 |    ACTION                           |
|----------------------|-------------------------------------|
| /healthz             | Test API                            |
| /signup              | Signup page                         |
| /masterchef          | Signin page                         |
| /homepage            | Home page                           |
| /createpost          | Get creating post page              |
| /getpost/:postId     | Get specific post                   |
| /createuserprofile   | Get creating user bio page          |
| /userprofile/:userId | Visit profile of specific user page |
| /personalprofile     | personal profile page               |
| /downmarkguide       | Downmark guide page                 |
| /signout             | Signout page                        |


--------------------------------------------------------------------------------------

### POST



| PATH                           |    ACTION                                                    |
|--------------------------------|--------------------------------------------------------------|
| /signup                        | Create new user                                              |        
| /masterchef                    | Login to the website by(Username/Email )                     |
| /createpost                    | Create new post (to logined user)                            |
| /getpost/createcomment/:postId | Create a comment on specific post (to logined user)          |
| /like/:postId                  | Create a like on specific (to logined user)                  |
| /deletepost/:postId            | Dislike a specific post (to logined user and who created it) |
| /deletecot/:commentId          | Delete comment a post (to logined user and who created it)   |
| /createuserprofile             | Create bio to the new user                                   |
