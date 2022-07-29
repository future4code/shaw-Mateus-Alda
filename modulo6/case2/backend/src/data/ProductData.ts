import { Product } from "../model/Product";
import { ProductDataInterface } from "../model/ProductDataInterface";
import { productTableName } from "../model/TableNames";
import { GetProductResponse } from "../types/getProductResponse";
import BaseDatabase from "./BaseDatabase";

export default class ProductData extends BaseDatabase implements ProductDataInterface {
    private TABLE_NAME = productTableName
    insert = async (product: Product) => {
        try {
            await this.connection(this.TABLE_NAME)
                .insert(product)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }

    getProductByName = async (name: string) => {
        try {
            const queryResult: GetProductResponse[] = await this.connection(this.TABLE_NAME)
                .where({ name })

            return queryResult[0]
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }

    getProductById = async (id: number) => {
        try {
            const queryResult: GetProductResponse[] = await this.connection(this.TABLE_NAME)
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

    searchProducts = async (search: string) => {
        try {
            const queryResult: GetProductResponse[] = await this.connection(this.TABLE_NAME)
                .whereLike('name', `%${search}%`)
                .orWhereLike('tag', `%${search}%`)

            return queryResult
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }

    getAllProducts = async () => {
        try {
            const queryResult: GetProductResponse[] = await this.connection(this.TABLE_NAME)

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