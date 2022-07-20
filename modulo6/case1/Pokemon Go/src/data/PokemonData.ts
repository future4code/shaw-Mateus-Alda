import { PokemonDataInterface } from "../model/PokemonDataInterface";
import { tableName } from "../model/tableName";
import { FilterInput } from "../types/filterInput";
import { GetFullPokemonResponse } from "../types/getFullPokemonResponse";
import { GetPokemonPaginationDataInputDTO } from "../types/getPokemonPaginationDataInputDTO";
import { BaseDatabase } from "./BaseDatabase";

export default class PokemonData extends BaseDatabase implements PokemonDataInterface {
    private TABLE_NAME: string = tableName

    getAllPokemon = async (dataInput: GetPokemonPaginationDataInputDTO) => {
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

    getPokemonByPartialName = async (name: string) => {
        try {
            const queryResult: GetFullPokemonResponse[] = await this.connection(this.TABLE_NAME)
                .whereILike('name', `%${name}%`)

            return queryResult

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }

    getPokemonByFilter = async (filterInput: FilterInput) => {
        const { propertyToFilterBy, filter } = filterInput
        try {
            const queryResult: GetFullPokemonResponse[] = await this.connection(this.TABLE_NAME)
                .where(propertyToFilterBy, filter)

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