import { Request, Response } from "express";
import PokemonBusiness from "../business/PokemonBusiness";
import { tableColumn } from "../types/columnTypes";
import { FilterPokemonInputDTO } from "../types/filterPokemonInputDTO";
import { PokemonInputDTO } from "../types/pokemonInputDTO";
import { SearchPokemonInputDTO } from "../types/searchPokemonInputDTO";

export default class PokemonController {
    constructor (
        private pokemonBusiness: PokemonBusiness
    ) {}

    // getAllPokemon = async (req: Request, res: Response) => {
    //     const page = Number(req.query.page)
    //     const size = Number(req.query.size)
    //     const orderBy = req.query.orderBy as string
    //     const orderDirection = req.query.orderDirection as string

    //     const input: PokemonInputDTO = {
    //         page,
    //         size,
    //         orderBy,
    //         orderDirection
    //     }

    //     try {
    //         const pokemonList = await this.pokemonBusiness.getAllPokemon(input)

    //         res.send({ pokemonList })
            
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             return res.status(400).send(error.message)
    //         }
    //         res.status(500).send("Unknown error")
    //     }
    // }

    getPokemonByFilter = async (req: Request, res: Response) => {
        const page = Number(req.query.page)
        const size = Number(req.query.size)
        const orderBy = req.query.orderBy as string
        const orderDirection = req.query.orderDirection as string
        const propertyToFilterBy = req.query.propertyToFilterBy as tableColumn
        const filter = req.query.filter as string

        const input: FilterPokemonInputDTO = {
            page,
            size,
            orderBy,
            orderDirection,
            propertyToFilterBy,
            filter
        }

        try {
            const pokemonList = await this.pokemonBusiness.getPokemonByFilter(input)
            
            res.send({ pokemonList })

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Unknown error")
        }
    }

    searchPokemon = async (req: Request, res: Response) => {
        const page = Number(req.query.page)
        const size = Number(req.query.size)
        const orderBy = req.query.orderBy as string
        const orderDirection = req.query.orderDirection as string
        const search = req.query.search as string

        const input: SearchPokemonInputDTO = {
            page,
            size,
            orderBy,
            orderDirection,
            search
        }

        try {
            const pokemonList = await this.pokemonBusiness.searchPokemon(input)
            
            res.send({ pokemonList })

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Unknown error")
        }
    }
}