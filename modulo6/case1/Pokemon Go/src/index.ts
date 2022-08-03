import PokemonBusiness from "./business/PokemonBusiness";
import { app } from "./controller/app";
import PokemonController from "./controller/PokemonController";
import PokemonData from "./data/PokemonData";

const pokemonController = new PokemonController( new PokemonBusiness( new PokemonData() ) )

app.get('/pokemon', pokemonController.getPokemonByFilter)
app.get('/pokemon/search', pokemonController.searchPokemon)