import { CustomError } from "../error/CustomError";
import { Product } from "../model/Product";
import { ProductDataInterface } from "../model/ProductDataInterface";
import { GetProductResponse } from "../types/getProductResponse";
import { RegisterProductInputDTO } from "../types/registerProductInputDTO";

export default class ProductBusiness {
    constructor (
        private productData: ProductDataInterface
    ) {}

    async register (input: RegisterProductInputDTO) {
        const { id, name, tags } = input

        const productSameId = await this.productData.getProductById(id)
        if (productSameId) {
            throw new CustomError(409, "Product with this id already exists")
        }
        const productSameName = await this.productData.getProductByName(name)
        if (productSameName) {
            throw new CustomError(409, "Product with this name already exists")
        }

        const newProduct = new Product(id, name, tags)

        await this.productData.insert(newProduct)

        return name
    }

    async getById (id: number) {

        if (!id || isNaN(id)) {
            throw new CustomError(417, "Invalid id")
        }

        const result = await this.productData.getProductById(id)
        if (!result) {
            throw new CustomError(404, "Product not found")
        }

        return result
    }

    async search (searchInput: string) {
        let result: GetProductResponse[]
        if (!searchInput) {
            result = await this.productData.getAllProducts()

            return result
        }

        result = await this.productData.searchProducts(searchInput)

        return result
    }
}