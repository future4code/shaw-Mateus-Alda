import { tableColumn } from "./columnTypes"

export type DataFilterInput = {
    propertyToFilterBy: tableColumn
    filter: string | number | null
}