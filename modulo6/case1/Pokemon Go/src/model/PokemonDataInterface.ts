import { FilterPokemonDataInputDTO } from "../types/filterPokemonDataInputDTO";
import { GetFullPokemonResponse } from "../types/getFullPokemonResponse";
import { PokemonDataInputDTO } from "../types/pokemonDataInputDTO";
import { SearchPokemonDataInputDTO } from "../types/searchPokemonDataInputDTO";

export interface PokemonDataInterface {
    getAllPokemon: (dataInput: PokemonDataInputDTO) => Promise<GetFullPokemonResponse[]>

    getPokemonByFilter: (dataFilterInput: FilterPokemonDataInputDTO) => Promise<GetFullPokemonResponse[]>
    
    getPokemonNameSearch: (searchInput: SearchPokemonDataInputDTO) => Promise<GetFullPokemonResponse[]>

}