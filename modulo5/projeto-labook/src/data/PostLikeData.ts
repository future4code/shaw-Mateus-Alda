import { PostType } from "../model/Post";
import { PostLike } from "../model/PostLike";
import { GetPostResponse } from "../types/GetPostResponse";
import { BaseDatabase } from "./BaseDatabase";

export default class PostLikeData extends BaseDatabase {
    private TABLE_NAME = 'labook_post_like'

    insert = async (postLike: PostLike) => {
        try {
            await this.connection(this.TABLE_NAME)
                .insert(postLike)
            
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }
    
    delete = async (postLike: PostLike) => {
        try {
            await this.connection(this.TABLE_NAME)
                .where(postLike)
                .delete()
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }

    findLikeByUser = async (postLike: PostLike) => {
        try {
            const queryResult = await this.connection(this.TABLE_NAME)
                .where( postLike )

            return queryResult.length > 0

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }
}