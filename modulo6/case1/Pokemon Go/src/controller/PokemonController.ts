import { Request, Response } from "express";
import PokemonBusiness from "../business/PokemonBusiness";
import { GetPokemonPaginationInputDTO } from "../types/getPokemonPaginationInputDTO";

export default class PokemonController {
    constructor (
        private pokemonBusiness: PokemonBusiness
    ) {}

    getAllPokemon = async (req: Request, res: Response) => {
        const page = Number(req.query.page)
        const size = Number(req.query.size)
        const orderBy = req.query.orderBy as string
        const orderDirection = req.query.orderDirection as string

        const input: GetPokemonPaginationInputDTO = {
            page,
            size,
            orderBy,
            orderDirection
        }

        try {
            const pokemonList = await this.pokemonBusiness.getAllPokemon(input)
            
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Unknown error")
        }
    }
}