import { tableName } from "../../model/tableName";
import { BaseDatabase } from "../BaseDatabase";
import pokemon from "./pokemon.json"

class Migrations extends BaseDatabase {
    createTable = async () => {
        try {
            this.connection.raw(`

                CREATE TABLE IF NOT EXISTS ${tableName}(
                    id INT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    pokedex_number INT NOT NULL,
                    img_name VARCHAR(255) NOT NULL,
                    generation INT NOT NULL,
                    evolution_stage VARCHAR(255),
                    evolved INT NOT NULL,
                    family_id INT,
                    cross_gen INT NOT NULL,
                    type_one VARCHAR(255) NOT NULL,
                    type_two VARCHAR(255),
                    weather_one VARCHAR(255) NOT NULL,
                    weather_two VARCHAR(255),
                    stat_total INT NOT NULL,
                    atk INT NOT NULL,
                    def INT NOT NULL,
                    sta INT NOT NULL,
                    legendary INT NOT NULL,
                    aquireable INT NOT NULL,
                    spawns INT NOT NULL,
                    regional INT NOT NULL,
                    raidable INT NOT NULL,
                    hatchable INT NOT NULL,
                    shiny INT NOT NULL,
                    nest INT NOT NULL,
                    new INT NOT NULL,
                    not_gettable INT NOT NULL,
                    future_evolve INT NOT NULL,
                    full_cp_at_forty INT NOT NULL,
                    full_cp_at_thirty_nine INT NOT NULL
                );

            `)
            .then(() => { console.log("Table created") })
        } catch (error: any) {
            console.log(error.sqlMessage || error.message)
        }
    }

    insertPokemon = async () => {
        try {
            await this.connection(tableName)
            .insert(pokemon)
            .then(() => { console.log("Pokemon info created") })
        } catch (error: any) {
            console.log(error.sqlMessage || error.message)
        }
    }
    
    closeConnection = async () => {
        this.connection.destroy()
    }
}

const migrations = new Migrations()
migrations.createTable()
.then(migrations.insertPokemon)
.then(migrations.closeConnection)