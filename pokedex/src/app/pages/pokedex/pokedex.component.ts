import { Component, OnInit } from '@angular/core';
import { PokemonCardComponent } from '../../shared';
import { PokedexService } from './pokedex.service';
import { HttpClientModule } from '@angular/common/http';
import { effect } from '@angular/core'; 

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [PokemonCardComponent, HttpClientModule],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  providers: [PokedexService]
})
export class PokedexComponent implements OnInit {
  public pokedex: any[] = [{ name: "teste", id: "ss" }];
  public pokemons = this.pokedexService.pokemons;

  constructor(private pokedexService: PokedexService) {
    effect(() => {
      console.log('Lista de Pokémon carregada:', this.pokemons());
    });
  }

  ngOnInit(): void {
    this.pokedexService.fetchPokemons(10);
  }
}
