import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Pokemon, PokemonListResponse } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  public pokemons = signal<Pokemon[]>([]);
  private offset = 0;
  public selectedPokemon = signal<Pokemon | null>(null);
  constructor(private http: HttpClient) {}

  public fetchPokemons(limit: number = 10): void {
    const url = `/pokedex/pokemons?limit=${limit}&offset=${this.offset}`;

    this.http.get<PokemonListResponse>(url).subscribe((response) => {
      const pokemonRequests = response.results.map((pokemon) => {
        return this.http.get<Pokemon>(pokemon.url);
      });
      forkJoin(pokemonRequests).subscribe((pokemonDetails: Pokemon[]) => {
        this.pokemons.update((existingPokemons) => [
          ...existingPokemons,
          ...pokemonDetails,
        ]);
        this.offset += limit;
      });
    });
  }

  public searchPokemonByName(name: string): void {
    const url = `/pokedex/pokemon/${name.toLowerCase()}`;

    this.http.get<Pokemon>(url).subscribe(
      (pokemonDetails) => {
        this.pokemons.set([pokemonDetails]);
        this.selectedPokemon.set(pokemonDetails);
      },
      (error) => {
        console.error('Pokémon not found:', error);
        this.pokemons.set([]);
        this.selectedPokemon.set(null);
      },
    );
  }
}