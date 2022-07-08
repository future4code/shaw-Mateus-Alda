import { Request, Response } from "express";
import PostBusiness from "../business/PostBusiness";
import { CreatePostInputDTO } from "../types/createPostInputDTO";

export default class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) { }

    createPost = async (req: Request, res: Response) => {
        const token = req.headers.authorization
        const { description, image, type } = req.body

        const input: CreatePostInputDTO = {
            description,
            image,
            type
        }

        try {
            const post = await this.postBusiness.createPost(token, input)

            res.status(201).send({ message: "Post created successfully.", post })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Post creation error.")
        }
    }

    getPostById = async (req: Request, res: Response) => {
        const token = req.headers.authorization
        const id = req.params.id

        try {
            const post = await this.postBusiness.getPostById(token, id)

            res.send({ post })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Post error.")
        }
    }

    getPostsByType = async (req: Request, res: Response) => {
        const token = req.headers.authorization
        const type = req.query.type as string

        try {
            const sortedPosts = await this.postBusiness.getPostsByType(token, type)

            res.send({ sortedPosts })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Post error.")
        }
    }

    likePost = async (req: Request, res: Response) => {
        const token = req.headers.authorization
        const id = req.params.id

        try {
            await this.postBusiness.likePost(token, id)

            res.send({ message: "Post liked by user!" })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Post error.")
        }
    }

    dislikePost = async (req: Request, res: Response) => {
        const token = req.headers.authorization
        const id = req.params.id

        try {
            await this.postBusiness.dislikePost(token, id)

            res.send({ message: "Post disliked by user!" })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Post error.")
        }
    }

    addComment = async (req: Request, res: Response) => {
        const token = req.headers.authorization
        const id = req.params.id
        const { comment } = req.body

        try {
            const {post, postComment} = await this.postBusiness.addComment(token, id, comment)

            res.send({ message: "Post commented by user!", post, newComment: postComment })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Post error.")
        }
    }

    deleteComment = async (req: Request, res: Response) => {
        const token = req.headers.authorization
        const id = req.params.id

        try {
            await this.postBusiness.deleteComment(token, id)

            res.send({ message: "Comment deleted by user!" })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Post error.")
        }
    }
}