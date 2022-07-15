import PostBusiness from "./business/PostBusiness";
import UserBusiness from "./business/UserBusiness";
import { app } from "./controller/app";
import PostController from "./controller/PostController";
import UserController from "./controller/UserController";
import PostCommentData from "./data/PostCommentData";
import PostData from "./data/PostData";
import PostLikeData from "./data/PostLikeData";
import UserData from "./data/UserData";

const userController = new UserController( new UserBusiness( new UserData() ) )
const postController = new PostController( new PostBusiness( new PostData(), new UserData(), new PostLikeData(), new PostCommentData() ) )

app.post('/signup', userController.signup)
app.post('/login', userController.login)

app.put('/user/friend/:id', userController.addFriend)
app.put('/user/unfriend/:id', userController.removeFriend)
app.get('/user/feed', userController.getFeed)

app.post('/post', postController.createPost)
app.get('/post', postController.getPostsByType)
app.get('/post/:id', postController.getPostById)
app.post('/post/:id/like', postController.likePost)
app.delete('/post/:id/like', postController.dislikePost)
app.post('/post/:id/comment', postController.addComment)
app.delete('/post/comment/:id', postController.deleteComment)