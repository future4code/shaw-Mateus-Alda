import PostBusiness from "./business/PostBusiness";
import UserBusiness from "./business/UserBusiness";
import { app } from "./controller/app";
import PostController from "./controller/PostController";
import UserController from "./controller/UserController";
import PostData from "./data/PostData";
import UserData from "./data/UserData";

const userController = new UserController( new UserBusiness( new UserData() ) )
const postController = new PostController( new PostBusiness( new PostData() ) )

app.post('/signup', userController.signup)
app.post('/login', userController.login)

app.post('/post', postController.createPost)
app.get('/post/:id', postController.getById)