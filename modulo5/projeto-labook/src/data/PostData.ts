import { Post, PostType } from "../model/Post";
import { GetPostResponse } from "../types/GetPostResponse";
import { BaseDatabase } from "./BaseDatabase";

export default class PostData extends BaseDatabase {
    private TABLE_NAME = 'labook_posts'

    insert = async (post: Post) => {
        try {
            await this.connection(this.TABLE_NAME)
                .insert(post)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }

    getAllPosts = async () => {
        try {
            const queryResult: GetPostResponse[] = await this.connection(this.TABLE_NAME)

            return queryResult

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }

    getPostById = async (id: string) => {
        try {
            const queryResult: GetPostResponse[] = await this.connection(this.TABLE_NAME)
                .where({ id })

            return queryResult[0]

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }

    getPostsByType = async (type: PostType) => {
        try {
            const queryResult: GetPostResponse[] = await this.connection(this.TABLE_NAME)
                .where({ type })

            return queryResult

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }

    getFeed = async (userFriends: string[], limit: number, offset: number, order: string) => {
        try {
            const queryResult: GetPostResponse[] = await this.connection(this.TABLE_NAME)
                .whereIn('user_id', userFriends)
                .limit(limit)
                .offset(offset)
                .orderBy('created_at', order)

            return queryResult
            
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }

    getAllPostsFromUser = async (user_id: string) => {
        try {
            const queryResult: GetPostResponse[] = await this.connection(this.TABLE_NAME)
                .where({ user_id })            

            return queryResult

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }

    updatePostLikes = async (id: string, total_likes: number) => {
        try {
            const affectedRows = await this.connection(this.TABLE_NAME)
                .update({ total_likes })
                .where({ id })            

            return affectedRows

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }
}