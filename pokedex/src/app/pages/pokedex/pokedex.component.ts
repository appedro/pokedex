import { Component, effect, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { PokemonCardComponent } from '../../shared';
import { PokedexService } from '../../shared/services/pokedex.service';
import { HttpClientModule } from '@angular/common/http';
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
  public notFound: boolean = false;

  constructor(private pokedexService: PokedexService) {
    effect(() => {
      const isEmpty = this.pokemons().length === 0;
      this.notFound = isEmpty;
    });
  }

  ngOnInit(): void {
    this.pokedexService.fetchPokemons(10);

    this.searchForm.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      if (value) {
        this.pokedexService.searchPokemonByName(value);
      } else {
        this.notFound = false;
        this.pokedexService.fetchPokemons(10);
      }
    });
  }

  public openDetails(): void {}

  public loadMorePokemons(): void {
    this.pokedexService.fetchPokemons(10);
  }
}
