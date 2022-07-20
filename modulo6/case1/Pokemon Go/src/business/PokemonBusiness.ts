import { InvalidInputError } from "../errors/InvalidInputError";
import { PokemonDataInterface } from "../model/PokemonDataInterface";
import { tableColumns } from "../model/tableColumns";
import { tableColumn } from "../types/columnTypes";
import { FilterInput } from "../types/filterInput";
import { GetPokemonPaginationDataInputDTO } from "../types/getPokemonPaginationDataInputDTO";
import { GetPokemonPaginationInputDTO } from "../types/getPokemonPaginationInputDTO";

export default class PokemonBusiness {
    constructor (
        private pokemonData: PokemonDataInterface
    ) {}

    getAllPokemon = async (input: GetPokemonPaginationInputDTO) => {
        let { page, size, orderBy, orderDirection } = input
        
        if (!page || page < 1 || isNaN(page)) {
            page = 1
        }
        if (!size || size < 5 || isNaN(size)) {
            size = 5
        }
        if (!orderDirection || orderDirection !== 'desc') {
            orderDirection = 'asc'
        }
        if (!orderBy || !(<any>Object).values(tableColumn).includes(orderBy)){
            orderBy = tableColumn.id
        }

        const offset = (page - 1) * size

        const dataInput: GetPokemonPaginationDataInputDTO = {
            size,
            offset,
            orderBy: orderBy as tableColumn,
            orderDirection
        }

        const result = await this.pokemonData.getAllPokemon(dataInput)
    }

    getPokemonByFilter = async (input: FilterInput) => {
        let { propertyToFilterBy, filter } = input
        let typedFilter
        if (!propertyToFilterBy || !(<any>Object).values(tableColumn).includes(propertyToFilterBy)){
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
    }
}