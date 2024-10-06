import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Pokemon, PokemonListResponse } from '../../shared/models/pokemon.model';


@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  public pokemons = signal<Pokemon[]>([]); 
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  public fetchPokemons(limit: number = 10): void {
    const url = `${this.baseUrl}/pokemon?limit=${limit}`;

    this.http.get<PokemonListResponse>(url).subscribe(response => { 
      const pokemonRequests = response.results.map((pokemon) => {
        return this.http.get<Pokemon>(pokemon.url);
      });

      forkJoin(pokemonRequests).subscribe((pokemonDetails: Pokemon[]) => {
        this.pokemons.set(pokemonDetails); 
      });
    });
  }
}