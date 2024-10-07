import { Component, Inject, OnInit, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokedexService } from '../../services/pokedex.service';
import { Pokemon, PokemonType } from '../../models';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
  providers: [PokedexService, HttpClient, { provide: MAT_DIALOG_DATA, useValue: {} },],
})
export class PokemonDetailsComponent {
  public pokemon?: Pokemon;
  public pokemonType?: string = this.pokemon?.types[0].type.name;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Pokemon) {
    this.pokemon = data;
  }
}
