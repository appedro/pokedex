import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PokemonType } from '../../models/pokemon.model';

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

  public typeColors: { [key: string]: string } = {
    fire: 'rgb(239, 129, 30)', 
    water: 'rgb(0, 144, 255)', 
    grass: 'rgb(100, 200, 100)', 
    electric: 'rgb(255, 255, 55)', 
    ice: 'rgb(150, 255, 255)', 
    fighting: 'rgb(192, 48, 40)', 
    poison: 'rgb(160, 60, 160)', 
    ground: 'rgb(210, 180, 100)', 
    flying: 'rgb(160, 160, 255)', 
    psychic: 'rgb(255, 100, 100)', 
    bug: 'rgb(170, 185, 20)', 
    rock: 'rgb(200, 190, 100)', 
    ghost: 'rgb(100, 100, 255)', 
    dragon: 'rgb(100, 100, 255)', 
    dark: 'rgb(60, 60, 60)', 
    steel: 'rgb(170, 170, 170)', 
    fairy: 'rgb(255, 182, 255)',
    normal: 'rgba(155, 155, 155)',
  };

  public shadowColors: { [key: string]: string } = {
    fire: 'rgb(239, 129, 30, 0.8)', 
    water: 'rgb(0, 144, 255, 0.8)', 
    grass: 'rgb(100, 200, 100, 0.8)', 
    electric: 'rgb(255, 255, 55, 0.8)', 
    ice: 'rgb(150, 255, 255, 0.8)', 
    fighting: 'rgb(192, 48, 40, 0.8)', 
    poison: 'rgb(160, 60, 160, 0.8)', 
    ground: 'rgb(210, 180, 100, 0.8)', 
    flying: 'rgb(160, 160, 255, 0.8)', 
    psychic: 'rgb(255, 100, 100, 0.8)', 
    bug: 'rgb(170, 185, 20, 0.8)', 
    rock: 'rgb(200, 190, 100, 0.8)', 
    ghost: 'rgb(100, 100, 255, 0.8)', 
    dragon: 'rgb(100, 100, 255, 0.8)', 
    dark: 'rgb(60, 60, 60, 0.8)', 
    steel: 'rgb(170, 170, 170, 0.8)', 
    fairy: 'rgb(255, 182, 255, 0.8)',
    normal: 'rgba(155, 155, 155, 0.8)',
  };

}
