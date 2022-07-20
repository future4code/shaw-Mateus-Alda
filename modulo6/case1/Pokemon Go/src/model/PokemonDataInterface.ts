import { GetFullPokemonResponse } from "../types/getFullPokemonResponse";
import { GetPokemonPaginationDataInputDTO } from "../types/getPokemonPaginationDataInputDTO";

export interface PokemonDataInterface {
    getAllPokemon: (dataInput: GetPokemonPaginationDataInputDTO) => Promise<GetFullPokemonResponse[]>
}