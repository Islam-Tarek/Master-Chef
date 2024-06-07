## Master Chef: Share Food Recipes


**Master Chef** is a platform dedicated to food enthusiasts where users can share, explore, and interact with food recipes. This project facilitates the creation and management of recipe posts, along with user interactions through likes and comments. It provides a seamless experience for users to engage with each other and discover new culinary inspirations

<br/>
<br/>


## Features

   
#### Posts
- **Create Posts**: Users can create new posts to share their recipes.
- **Delete Posts**: The author of the post can delete their post.
- **Markdown Support**: Users can format their posts using Markdown.

#### Likes
- **Create Likes**: Users can like any post to show appreciation.
- **Delete Likes**: Users can remove their likes from any post.
- **Real-Time Updates**: The number of likes on a post updates in real-time when the user likes or unlikes a post.
- **Like Count Display**: Each post displays the total number of likes it has received.

#### Comments
- **Create Comments**: Users can comment on any post to share their thoughts or ask questions.
- **Delete Comments**: Users can delete their own comments.
- **Real-Time Updates**: The number of comments on a post updates in real-time when the user added new comment or removed.
- **Comment Count Display**: Each post displays the total number of comments it has received.

#### User Profiles
- **Profile Page**: Each user has a profile page showcasing their information and posts.
- **User Information**: Profile pages display the user's full name, join date, and a brief biography.
- **User's Posts**: All posts created by a user are listed on their profile page.
- **Likes count**: The number of likes the user has received on his posts shows the user's popularity.
- **Interactive Elements**: Clicking on a user's name in a post or comment takes you to their profile page.

#### Security and Authentication
- **Sanitized Inputs**: Markdown scripts in posts are sanitized to **prevent SQL injections and script executions**.
- **JWT-Based Authentication**: Secure login, signup, and logout processes using JSON Web Tokens (JWT).

#### Additional User Profile Features
- **Username Display**: Concatenation of the user's first and last names.
- **Join Date Display**: The profile shows the time when the user joined the platform.
- **Biography Section**: Users can write a brief "about" section to share more about themselves.
- **Real-Time Like Updates**: When a user likes or unlikes a post, the total number of likes on their profile updates in real-time.

</details>

<br/>

-----------------------------------------------------------

## Architecture

<details open>
<summary>
  <h3> Pattern : MVC </h3>
</summary>
<br>
**Master Chef** follows the Model-View-Controller (MVC) architectural pattern. This pattern separates the application into three main components:

1. **Model**
   - The Model represents the data and the business logic of the application. It directly manages the data, logic, and rules of the application. In Master Chef, the Model includes the database schema and interactions such as creating, reading, updating, and deleting posts, comments, likes, and user information.

2. **View**
   - The View is responsible for presenting the data to the user in a specific format. It is the user interface of the application. In Master Chef, the View includes the HTML/CSS templates and the front-end code that displays posts, comments, user profiles, and other user interactions.

3. **Controller**
   - The Controller acts as an intermediary between the Model and the View. It listens to the input from the View, processes it (using the Model), and returns the output display to the View. In Master Chef, the Controller handles user requests such as creating posts, liking a post, commenting, and managing user sessions.

By using the MVC pattern, Master Chef ensures a clean separation of concerns, making the codebase more modular, scalable, and maintainable.

<br/>
</details>


<br/>

<details open>
<summary>
   <h3> Entity Relation Diagram </h3>
</summary>
<br>
   <img src="./docs/architecture/ERDPic.png" />
<br>
</details>


<details open>
<summary>
   <h3> Database Schema </h3>
</summary>
   <a href="./docs/architecture/schema.md">
     Schema 
      </a>
<br>
</details>


<details open>
<summary>
   <h3> API </h3>
</summary>
   <a href="./docs/architecture/API.md">
     Schema 
      </a>
<br>
</details>

<br/>

----------------------------------------------------------------------

## Performance

### Machine Resources
- RAM: 8GB
- Processor: Core i5 12th Generation


### Stress Test Details
   - Number of requests
   - the total time to handle all request since sending first request to recive the last response



<details open>
<summary>
   <h2>  Get Single post </h2>
</summary>

   <details open>
      <summary>
         <h3> sending GET Request [1000 req - 100,000 req] </h3>
      </summary>
      <h4> handling 1000 REQ in ~ 0.8 SEC </h4>
      <h4> handling 10,000 REQ in ~ 6.1 SEC </h4>
      <h4> handling 100,000 REQ in ~ 49.4 SEC </h4>
      <img src="./docs/performance/stressTest/createGetRequest/getSinglePost/get single post request.png" />
   </details>

   <details open>
      <summary>
         <h3> sending GET Request [110,000 req - 120,000 req] </h3>
      </summary>
      <h4> handling 110,000 REQ in ~ 54.2 SEC </h4>
      <h4> handling 120,000 REQ in ~ 59.8 SEC  (~ per minute) </h4>
      <img src="./docs/performance/stressTest/createGetRequest/getSinglePost/get single post rquest 2.png" />
   </details>

</details>

<details open>
<summary>
   <h2>  Get All posts (all posts = 1000 post) </h2>
</summary>

<details open>
   <summary>
      <h3> sending GET Request (each request rendering 1000 post)</h3>
   </summary>
   <h4> handling 150 REQ in ~ 1.1 SEC  [ redering (150req x 1000post) = 150,0000 post / 1.1 sec)</h4>
   <h4> handling 500 REQ in ~ 3.7 SEC  [ redering (500req x 1000post) = 500,0000 post / 3.7 sec)</h4>
   <h4> handling 1000 REQ in ~ 7.2 SEC [ redering (1000req x 1000post) = 1,000,0000 post / 7.2 sec)</h4>
   <h4> handling 8000 REQ in ~ 56.8 SEC [ redering (8000req x 1000post) = 8,000,0000 post / 56.8 sec)</h4>
   <img src="./docs/performance/stressTest/createGetRequest/getAllposts/get all posts request.png" />
   </details>
</details>


<details open>
   
<summary>
   <h2> Creating new posts </h2>
</summary>

   <details open>
      <summary>
         <h3> sending 500 POST Request </h3>
      </summary>
      <h4> handling 500 REQ in ~ 0.9 SEC </h4>
      <img src="./docs/performance/stressTest/createPostRequest/createNewPost/creating 500 new post.png" />
   </details>
   <details open>
      <summary>
         <h3> sending 10,000 POST Request </h3>
      </summary>
      <h4> handling 10,000 REQ in ~ 15.8 SEC </h4>
      <img src="./docs/performance/stressTest/createPostRequest/createNewPost/creating 10,000 new post.png" />
   </details>
    <details open>
      <summary>
         <h3> sending 37,000 POST Request </h3>
      </summary>
      <h4> handling 37,000 REQ in ~ 58.9 SEC (~ per minute) </h4>
      <img src="./docs/performance/stressTest/createPostRequest/createNewPost/creating 37,000 new post.png" />
   </details>

</details>

<details open>


<summary>
   <h2> Creating Likes </h2>
</summary>

   <details open>
      <summary>
         <h3> sending 500 POST Request </h3>
      </summary>
      <h4> handling 500 REQ in ~ 1.1 SEC </h4>
      <img src="./docs/performance/stressTest/createPostRequest/createLikeOnPost/creating 500 like.png" />
   </details>
   <details open>
      <summary>
         <h3> sending 8,300 POST Request </h3>
      </summary>
      <h4> handling 8,300 REQ in ~ 59.7 SEC  (~ per minute) </h4>
      <img src="./docs/performance/stressTest/createPostRequest/createLikeOnPost/creating 8,300 like.png" />
   </details>

</details>


