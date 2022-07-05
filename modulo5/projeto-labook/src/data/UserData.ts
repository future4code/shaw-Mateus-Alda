import User from "../model/User";
import { GetUserByEmailResponse } from "../types/getUserByEmailResponse";
import { BaseDatabase } from "./BaseDatabase";

export default class UserData extends BaseDatabase{
    private TABLE_NAME = ''
    insert = async (user: User) => {
        try {
            await this.connection(this.TABLE_NAME)
                .insert(user)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }

    getUserByEmail = async (email: string) => {
        try {
            const queryResult: GetUserByEmailResponse = await this.connection(this.TABLE_NAME)
                .where({ email })

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