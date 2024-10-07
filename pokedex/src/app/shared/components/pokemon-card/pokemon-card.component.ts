import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pokemon, PokemonType } from '../../models/pokemon.model';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  @Input() public name?: string;
  @Input() public id?: string;
  @Input() public types?: PokemonType[];
  @Input() public sprite?: string;

  private _pokemon?: Pokemon;
  public pokemonType?: string;

  @Input() 
  set pokemon(value: Pokemon | undefined) {
    this._pokemon = value;
    this.pokemonType = this._pokemon?.types[0]?.type.name || undefined;
  }

  get pokemon(): Pokemon | undefined {
    return this._pokemon;
  }

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    console.log(this.pokemon)
    this.dialog.open(PokemonDetailsComponent, {
      data: this.pokemon,
      panelClass: 'custom-dialog',
    });
  }
}
