import { tableColumn } from "./columnTypes"

export type FilterPokemonInputDTO = {
    page: number
    size: number
    orderBy: string
    orderDirection: string
    propertyToFilterBy: tableColumn
    filter: string
}