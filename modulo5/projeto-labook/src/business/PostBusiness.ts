import PostData from "../data/PostData";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { CreatePostInputDTO } from "../types/createPostInputDTO";
import { Post, PostType } from "../model/Post";
import { compareDesc } from "date-fns";
import PostLikeData from "../data/PostLikeData";
import { PostLike } from "../model/PostLike";
import { PostComment } from "../model/PostComment";
import UserData from "../data/UserData";
import PostCommentData from "../data/PostCommentData";

export default class PostBusiness {
    constructor(
        private postData: PostData,
        private userData: UserData,
        private postLikeData: PostLikeData,
        private postCommentData: PostCommentData
    ) { }

    createPost = async (token: string, input: CreatePostInputDTO) => {

        const authenticationData = Authenticator.getTokenData(token)
        const user = await this.userData.getById(authenticationData.id)
        const { description, image, type } = input

        if (!token) {
            throw new Error("Authentication token is missing.")
        }
        if (!user) {
            throw new Error("User with this token does not exist.");
        }
        if (!description || !image || !type) {
            throw new Error("Invalid 'description', 'image' or 'type' field.")
        }

        const id = IdGenerator.generateId()

        const post = new Post(
            id,
            description,
            image,
            type,
            authenticationData.id
        )
        await this.postData.insert(post)

        return post
    }

    getPostById = async (token: string, id: string) => {

        const authenticationData = Authenticator.getTokenData(token)
        const user = await this.userData.getById(authenticationData.id)

        if (!token) {
            throw new Error("Authentication token is missing.")
        }
        if (!user) {
            throw new Error("User with this token does not exist.");
        }

        const post = await this.postData.getPostById(id)

        return post
    }

    getPostsByType = async (token: string, type: string) => {

        const authenticationData = Authenticator.getTokenData(token)
        const user = await this.userData.getById(authenticationData.id)

        if (!token) {
            throw new Error("Authentication token is missing.")
        }
        if (!user) {
            throw new Error("User with this token does not exist.");
        }
        if (type && type !== PostType.Normal && type !== PostType.Event) {
            throw new Error("Invalid query param for type.")
        }

        let posts
        if (!type) {
            posts = await this.postData.getAllPosts()
        } else {
            posts = await this.postData.getPostsByType(type as PostType)
        }

        posts.sort((a, b) => compareDesc(a.created_at, b.created_at))

        return posts
    }

    likePost = async (token: string, id: string) => {

        const authenticationData = Authenticator.getTokenData(token)
        const user = await this.userData.getById(authenticationData.id)
        if (!token) {
            throw new Error("Authentication token is missing.")
        }
        if (!user) {
            throw new Error("User with this token does not exist.");
        }
        if (!id) {
            throw new Error("Post ID is missing.")
        }

        const post = await this.postData.getPostById(id)
        if (!post) {
            throw new Error("There is no post with this ID.")
        }

        const postLike = new PostLike(
            post.id,
            user.id
        )

        const isPostLikedByUser = await this.postLikeData.findLikeByUser(postLike)
        if (isPostLikedByUser) {
            throw new Error("Post already liked by user.")
        }

        await this.postLikeData.insert(postLike)

        const totalLikes = post.total_likes + 1
        const affectedRows = await this.postData.updatePostLikes(post.id, totalLikes)
        if (affectedRows === 0) {
            throw new Error("Total likes value on post not changed. Unexpected error.");
        }
    }

    dislikePost = async (token: string, id: string) => {

        const authenticationData = Authenticator.getTokenData(token)
        const user = await this.userData.getById(authenticationData.id)
        if (!token) {
            throw new Error("Authentication token is missing.")
        }
        if (!user) {
            throw new Error("User with this token does not exist.");
        }
        if (!id) {
            throw new Error("Post ID is missing.")
        }

        const post = await this.postData.getPostById(id)
        if (!post) {
            throw new Error("There is no post with this ID.")
        }

        const postLike = new PostLike(
            post.id,
            user.id
        )

        const isPostLikedByUser = await this.postLikeData.findLikeByUser(postLike)
        if (!isPostLikedByUser) {
            throw new Error("Post already not liked by user.")
        }

        await this.postLikeData.delete(postLike)

        const totalLikes = post.total_likes - 1
        const affectedRows = await this.postData.updatePostLikes(post.id, totalLikes)
        if (affectedRows === 0) {
            throw new Error("Total likes value on post not changed. Unexpected error.");
        }
    }

    addComment = async (token: string, post_id: string, comment: string) => {

        const authenticationData = Authenticator.getTokenData(token)
        const user = await this.userData.getById(authenticationData.id)

        if (!token) {
            throw new Error("Authentication token is missing.")
        }
        if (!user) {
            throw new Error("User with this token does not exist.");
        }
        if (!comment) {
            throw new Error("Comment field must be filled.")
        }

        const post = await this.postData.getPostById(post_id)
        if (!post) {
            throw new Error("There is no post with this ID.")
        }

        const id = IdGenerator.generateId()

        const postComment = new PostComment(
            id,
            comment,
            post_id,
            user.id
        )
        await this.postCommentData.insert(postComment)

        return { post, postComment }
    }

    deleteComment = async (token: string, id: string) => {

        const authenticationData = Authenticator.getTokenData(token)
        const user = await this.userData.getById(authenticationData.id)

        if (!token) {
            throw new Error("Authentication token is missing.")
        }
        if (!user) {
            throw new Error("User with this token does not exist.");
        }
        if (!id) {
            throw new Error("Comment ID must be provided.")
        }

        const comment = await this.postCommentData.getCommentById(id)
        if (!comment) {
            throw new Error("There is no comment with this ID.")
        }

        await this.postCommentData.delete(id)
    }
}