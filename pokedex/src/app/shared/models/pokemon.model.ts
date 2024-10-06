
export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: PokemonType[];
    abilities: Ability[];
    stats: Stat[];
    sprites: Sprites;
}

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

interface Ability {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

interface Sprites {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string;
        url: string;
    }[];
}
