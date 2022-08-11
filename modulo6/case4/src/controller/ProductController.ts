import { Request, Response } from "express";
import ProductBusiness from "../business/ProductBusiness";
import { RegisterProductInputDTO } from "../types/registerProductInputDTO";

export default class ProductController {
    constructor (
        private productBusiness: ProductBusiness
    ) {}

    register = async (req: Request, res: Response) => {
        const {id, name, tags} = req.body

        const input: RegisterProductInputDTO = {
            id,
            name,
            tags
        }
        try {
            const productName = await this.productBusiness.register(input)

            res.status(201).send(`${productName} registered successfully`)
            
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Register error.")
        }
    }
    
    getById = async (req: Request, res: Response) => {
        const id = Number(req.params.id)

        try {
            const product = await this.productBusiness.getById(id)

            res.send({ product })
            
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Register error.")
        }
    }

    search = async (req: Request, res: Response) => {
        const searchInput = req.query.search as string

        try {
            const searchResult = await this.productBusiness.search(searchInput)

            res.send({ productsFromSearch: searchResult })
            
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Register error.")
        }
    }
}