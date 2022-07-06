import { Request, Response } from "express";
import PostBusiness from "../business/PostBusiness";
import { CreatePostInputDTO } from "../types/createPostInputDTO";

export default class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) { }

    createPost = async (req: Request, res: Response) => {
        const token = req.headers.authorization
        const { description, image, postType } = req.body

        const input: CreatePostInputDTO = {
            description,
            image,
            postType
        }
        
        try {
            const post = await this.postBusiness.createPost(token, input)

            res.status(201).send({ message: "Post created successfully.", post})
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Post creation error.")
        }
    }

    getById = async (req: Request, res: Response) => {
        const token = req.headers.authorization
        const id = req.params.id
        
        try {
            const post = await this.postBusiness.getById(token, id)

            res.send({ post })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Post error.")
        }
    }
}