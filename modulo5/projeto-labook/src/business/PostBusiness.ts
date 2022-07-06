import PostData from "../data/PostData";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { CreatePostInputDTO } from "../types/createPostInputDTO";
import { format } from "date-fns"
import { Post } from "../model/Post";

export default class PostBusiness {
    constructor(
        private postData: PostData
    ){}

    createPost = async (token: string, input: CreatePostInputDTO) => {

        const authenticationData = Authenticator.getTokenData(token)
        const { description, image, postType } = input

        if (!token) {
            throw new Error("Authentication token is missing.")
        }
        if (!description || !image || !postType) {
            throw new Error("Invalid 'description', 'image' or 'postType' field.")
        }

        const id = IdGenerator.generateId()
        const creation_date = format(new Date, 'yyyy-MM-dd')

        const post = new Post (
            id,
            description,
            image,
            creation_date,
            postType,
            authenticationData.id 
        )
        await this.postData.insert(post)

        return post.getPost()
    }
    
    getById = async (token: string, id: string) => {

        const authenticationData = Authenticator.getTokenData(token)

        if (!token) {
            throw new Error("Authentication token is missing.")
        }

        const post = await this.postData.getById(id)

        return post
    }
}