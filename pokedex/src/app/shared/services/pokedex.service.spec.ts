import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokedexService } from './pokedex.service';
import { Pokemon, PokemonListResponse } from '../models/pokemon.model';

describe('PokedexService', () => {
  let service: PokedexService;
  let httpMock: HttpTestingController;

  const mockPokemonDetails: Pokemon = {
    id: 25,
    name: 'pikachu',
    height: 4,
    weight: 60,
    types: [{ slot: 1, type: { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13' } }],
    abilities: [{ ability: { name: 'static', url: 'https://pokeapi.co/api/v2/ability/9' }, is_hidden: false, slot: 1 }],
    stats: [{ base_stat: 35, effort: 0, stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6' } }],
    sprites: { front_default: '', front_shiny: '', back_default: '', back_shiny: '' }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokedexService],
    });

    service = TestBed.inject(PokedexService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search pokemon by name and update the signals', () => {
    service.searchPokemonByName('pikachu');

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemonDetails);

    const pokemons = service.pokemons();
    expect(pokemons.length).toBe(1);
    expect(pokemons[0]).toEqual(mockPokemonDetails);

    const selectedPokemon = service.selectedPokemon();
    expect(selectedPokemon).toEqual(mockPokemonDetails);
  });

  it('should handle pokemon not found and reset signals', () => {
    service.searchPokemonByName('unknown');

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/unknown');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Not Found'), { status: 404 });

    const pokemons = service.pokemons();
    expect(pokemons.length).toBe(0);

    const selectedPokemon = service.selectedPokemon();
    expect(selectedPokemon).toBeNull();
  });
});
