export type ColumnTypes = {
    id?: number,
    name?: string,
    pokedex_number?: number,
    img_name?: string,
    generation?: number,
    evolution_stage?: string | null,
    evolved?: number,
    family_id?: number | null,
    cross_gen?: number,
    type_one?: string,
    type_two?: string | null,
    weather_one?: string,
    weather_two?: string | null,
    stat_total?: number,
    atk?: number,
    def?: number,
    sta?: number,
    legendary?: number,
    aquireable?: number,
    spawns?: number,
    regional?: number,
    raidable?: number,
    hatchable?: number,
    shiny?: number,
    nest?: number,
    new?: number,
    not_gettable?: number,
    future_evolve?: number,
    full_cp_at_forty?: number,
    full_cp_at_thirty_nine?: number
}

export enum tableColumn {
    id = "id",
    name = "name",
    pokedex_number = "pokedex_number",
    img_name = "img_name",
    generation = "generation",
    evolution_stage = "evolution_stage",
    evolved = "evolved",
    family_id = "family_id",
    cross_gen = "cross_gen",
    type_one = "type_one",
    type_two = "type_two",
    weather_one = "weather_one",
    weather_two = "weather_two",
    stat_total = "stat_total",
    atk = "atk",
    def = "def",
    sta = "sta",
    legendary = "legendary",
    aquireable = "aquireable",
    spawns = "spawns",
    regional = "regional",
    raidable = "raidable",
    hatchable = "hatchable",
    shiny = "shiny",
    nest = "nest",
    new = "new",
    not_gettable = "not_gettable",
    future_evolve = "future_evolve",
    full_cp_at_forty = "full_cp_at_forty",
    full_cp_at_thirty_nine = "full_cp_at_thirty_nine"
}