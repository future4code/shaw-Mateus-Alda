import { tableColumn } from "./columnTypes"

export type FilterInput = {
    propertyToFilterBy: tableColumn
    filter: string | null
}