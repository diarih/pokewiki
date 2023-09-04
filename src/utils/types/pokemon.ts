interface PokemonAbility {
    isHidden: boolean,
    slot: number,
    ability: any
}

interface VersionGameIndex {
    // Define the properties for VersionGameIndex
}

interface PokemonHeldItem {
    // Define the properties for PokemonHeldItem
}

interface LocationAreaEncounters {
    // Define the properties for LocationAreaEncounters
}

interface PokemonMove {
    // Define the properties for PokemonMove
}

interface PokemonTypePast {
    generation: any
    types: any
}

interface PokemonSprites {
    // Define the properties for PokemonSprites
    other: any
}

interface NamedAPIResource {
    // Define the properties for NamedAPIResource
}

interface PokemonStat {
    // Define the properties for PokemonStat
}

interface PokemonType {
    slot: number,
    type: any
}

interface PokemonSpecies {
    // Define the properties for PokemonSpecies
}

interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: PokemonAbility[];
    forms: NamedAPIResource[];
    game_indices: VersionGameIndex[];
    held_items: PokemonHeldItem[];
    location_area_encounters: LocationAreaEncounters;
    moves: PokemonMove[];
    past_types: PokemonTypePast[];
    sprites: PokemonSprites;
    species: NamedAPIResource;
    stats: PokemonStat[];
    types: PokemonType[];
}

interface PokemonsResult {
    id: number,
    url: string
}

interface Pokemons {
    count: number,
    next: string | null,
    previous: string | null,
    results: PokemonsResult[]
}