import { PokemonDataInterface } from "../model/PokemonDataInterface";
import { tableName } from "../model/tableName";
import { FilterPokemonDataInputDTO } from "../types/filterPokemonDataInputDTO";
import { GetFullPokemonResponse } from "../types/getFullPokemonResponse";
import { PokemonDataInputDTO } from "../types/pokemonDataInputDTO";
import { SearchPokemonDataInputDTO } from "../types/searchPokemonDataInputDTO";
import { BaseDatabase } from "./BaseDatabase";

export default class PokemonData extends BaseDatabase implements PokemonDataInterface {
    private TABLE_NAME: string = tableName

    getAllPokemon = async (dataInput: PokemonDataInputDTO) => {
        const { size, offset, orderBy, orderDirection } = dataInput
        try {
            const queryResult: GetFullPokemonResponse[] = await this.connection(this.TABLE_NAME)
                .limit(size)
                .offset(offset)
                .orderBy(orderBy, orderDirection)

            return queryResult

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }

    getPokemonNameSearch = async (searchInput: SearchPokemonDataInputDTO) => {
        const { size, offset, orderBy, orderDirection, search } = searchInput
        try {
            const queryResult: GetFullPokemonResponse[] = await this.connection(this.TABLE_NAME)
                .whereILike('name', `%${search}%`)
                .limit(size)
                .offset(offset)
                .orderBy(orderBy, orderDirection)

            return queryResult

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }

    getPokemonByFilter = async (filterInput: FilterPokemonDataInputDTO) => {
        const { size, offset, orderBy, orderDirection, propertyToFilterBy, dataFilter } = filterInput
        try {
            const queryResult: GetFullPokemonResponse[] = await this.connection(this.TABLE_NAME)
                .where(propertyToFilterBy, dataFilter)
                .limit(size)
                .offset(offset)
                .orderBy(orderBy, orderDirection)

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