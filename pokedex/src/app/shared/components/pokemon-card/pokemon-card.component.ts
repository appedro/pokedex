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
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  @Input() public name?: string;
  @Input() public id?: string;
  @Input() public types?: PokemonType[];
  @Input() public sprite?: string;
  @Input() public pokemon?: Pokemon;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(PokemonDetailsComponent, {
      data: this.pokemon,      
      panelClass: "custom-dialog"
    });
  }
  
}
