import { tableColumn } from "./filterInput"

export type GetPokemonPaginationDataInputDTO = {
    size: number
    offset: number
    orderBy: tableColumn
    orderDirection: string
}