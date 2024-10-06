import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { PokemonCardComponent } from '../../shared';
import { PokedexService } from './pokedex.service';
import { HttpClientModule } from '@angular/common/http';
import { Pokemon } from '../../shared/models/pokemon.model';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [PokemonCardComponent, HttpClientModule, ReactiveFormsModule],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  providers: [PokedexService],
})
export class PokedexComponent implements OnInit {
  public pokemons = this.pokedexService.pokemons;
  public searchForm: FormControl = new FormControl();

  constructor(private pokedexService: PokedexService) {
  }

  ngOnInit(): void {
    this.pokedexService.fetchPokemons(10);

    this.searchForm.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      if (value) {
        this.pokedexService.searchPokemonByName(value);
      } else {
        this.pokedexService.fetchPokemons(10);
      }
    });
  }

  public loadMorePokemons(): void {
    this.pokedexService.fetchPokemons(10);
  }
}
