import User from "../model/User";
import { GetUserResponse } from "../types/getUserResponse";
import { BaseDatabase } from "./BaseDatabase";

export default class UserData extends BaseDatabase{
    private TABLE_NAME = 'labook_users'
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
            const queryResult: GetUserResponse = await this.connection(this.TABLE_NAME)
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
    
    getById = async (id: string) => {
        try {
            const queryResult: GetUserResponse = await this.connection(this.TABLE_NAME)
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

    updateFriends = async (id: string, newFriendsList: string) => {
        try {
            const affectedRows = await this.connection(this.TABLE_NAME)
                .where({ id })
                .update({ friends: newFriendsList })

            return Number(affectedRows)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }
}