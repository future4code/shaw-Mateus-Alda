import { tableColumn } from "./columnTypes"

export type FilterPokemonDataInputDTO = {
    size: number
    offset: number
    orderBy: tableColumn
    orderDirection: string
    propertyToFilterBy: tableColumn
    dataFilter: string | number | null
}