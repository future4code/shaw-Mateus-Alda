import { GetProductResponse } from "../types/getProductResponse"
import { Product } from "./Product"

export interface ProductDataInterface {
    insert: (product: Product) => Promise<void>

    getProductByName: (name: string) => Promise<GetProductResponse>

    getProductById: (id: number) => Promise<GetProductResponse>

    searchProducts: (search: string) => Promise<GetProductResponse[]>

    getAllProducts: () => Promise<GetProductResponse[]>
}