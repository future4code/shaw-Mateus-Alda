import { InvalidInputError } from "../errors/InvalidInputError";
import { PokemonDataInterface } from "../model/PokemonDataInterface";
import { tableColumns } from "../model/tableColumns";
import { tableColumn } from "../types/columnTypes";
import { FilterPokemonDataInputDTO } from "../types/filterPokemonDataInputDTO";
import { FilterPokemonInputDTO } from "../types/filterPokemonInputDTO";
import { PokemonDataInputDTO } from "../types/pokemonDataInputDTO";
import { PokemonInputDTO } from "../types/pokemonInputDTO";
import { SearchPokemonDataInputDTO } from "../types/searchPokemonDataInputDTO";
import { SearchPokemonInputDTO } from "../types/searchPokemonInputDTO";

export default class PokemonBusiness {
    constructor (
        private pokemonData: PokemonDataInterface
    ) {}

    // getAllPokemon = async (input: PokemonInputDTO) => {
    //     let { page, size, orderBy, orderDirection } = input
        
    //     if (!page || page < 1 || isNaN(page)) {
    //         page = 1
    //     }
    //     if (!size || size < 5 || isNaN(size)) {
    //         size = 5
    //     }
    //     if (!orderDirection || orderDirection !== 'desc') {
    //         orderDirection = 'asc'
    //     }
    //     if (!orderBy || !(<any>Object).values(tableColumn).includes(orderBy)){
    //         orderBy = tableColumn.id
    //     }

    //     const offset = (page - 1) * size

    //     const dataInput: PokemonDataInputDTO = {
    //         size,
    //         offset,
    //         orderBy: orderBy as tableColumn,
    //         orderDirection
    //     }

    //     const result = await this.pokemonData.getAllPokemon(dataInput)

    //     return result
    // }

    getPokemonByFilter = async (input: FilterPokemonInputDTO) => {
        let { page, size, orderBy, orderDirection, propertyToFilterBy, filter } = input
        let typedFilter = null
        
        if (!page || page < 1 || isNaN(page)) {
            page = 1
        }
        if (!size || size < 1 || isNaN(size)) {
            size = 20
        }
        if (!orderDirection || orderDirection !== 'desc') {
            orderDirection = 'asc'
        }
        if (!orderBy || !(<any>Object).values(tableColumn).includes(orderBy)){
            orderBy = tableColumn.id
        }
        
        const offset = (page - 1) * size
        let result

        if (!propertyToFilterBy) {
            const dataInput: PokemonDataInputDTO = {
                size,
                offset,
                orderBy: orderBy as tableColumn,
                orderDirection
            }

            result = await this.pokemonData.getAllPokemon(dataInput)
            return result
        }

        if (!(<any>Object).values(tableColumn).includes(propertyToFilterBy)){
            throw new InvalidInputError("Invalid property to filter by")
        }
        if (tableColumns[propertyToFilterBy].includes('number')) {
            if (!filter) {
                typedFilter = null
            } else {
                typedFilter = Number(filter)
            }
            if (typedFilter !== null && isNaN(typedFilter)) {
                throw new InvalidInputError("Invalid filterParams input")
            }
        }
        if (tableColumns[propertyToFilterBy].includes('string')) {
            if (!filter) {
                typedFilter = ''
            }
        }
        

        const dataFilterInput: FilterPokemonDataInputDTO = {
            size,
            offset,
            orderBy: orderBy as tableColumn,
            orderDirection,
            propertyToFilterBy,
            dataFilter: typedFilter
        }

        result = await this.pokemonData.getPokemonByFilter(dataFilterInput)

        return result
    }

    searchPokemon = async (input: SearchPokemonInputDTO) => {
        let { page, size, orderBy, orderDirection, search } = input
        
        if (!search) {
            throw new InvalidInputError("Invalid search input")
        }
        if (!page || page < 1 || isNaN(page)) {
            page = 1
        }
        if (!size || size < 1 || isNaN(size)) {
            size = 20
        }
        if (!orderDirection || orderDirection !== 'desc') {
            orderDirection = 'asc'
        }
        if (!orderBy || !(<any>Object).values(tableColumn).includes(orderBy)){
            orderBy = tableColumn.id
        }
        
        const offset = (page - 1) * size

        const dataFilterInput: SearchPokemonDataInputDTO = {
            size,
            offset,
            orderBy: orderBy as tableColumn,
            orderDirection,
            search
        }

        const result = await this.pokemonData.getPokemonNameSearch(dataFilterInput)

        return result
    }
}