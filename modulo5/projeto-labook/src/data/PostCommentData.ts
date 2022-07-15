import { PostComment } from "../model/PostComment";
import { GetCommentResponse } from "../types/getCommentResponse";
import { BaseDatabase } from "./BaseDatabase";

export default class PostCommentData extends BaseDatabase {
    private TABLE_NAME = 'labook_post_comment'

    insert = async (postComment: PostComment) => {
        try {
            await this.connection(this.TABLE_NAME)
                .insert(postComment)
            
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }
    
    delete = async (id: string) => {
        try {
            await this.connection(this.TABLE_NAME)
                .where({ id })
                .delete()
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }

    getCommentById = async (id: string) => {
        try {
            const queryResult: GetCommentResponse[] = await this.connection(this.TABLE_NAME)
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
}