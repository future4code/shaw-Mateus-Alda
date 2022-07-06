import { Post } from "../model/Post";
import { BaseDatabase } from "./BaseDatabase";

export default class PostData extends BaseDatabase {
    private TABLE_NAME = ''

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

    getById = async (id: string) => {
        try {
            const [queryResult] = await this.connection(this.TABLE_NAME)
                .where({id})

            return queryResult

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }
}