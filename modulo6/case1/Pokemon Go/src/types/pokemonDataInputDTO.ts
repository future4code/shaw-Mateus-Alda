import { tableColumn } from "./columnTypes"

export type PokemonDataInputDTO = {
    size: number
    offset: number
    orderBy: tableColumn
    orderDirection: string
}