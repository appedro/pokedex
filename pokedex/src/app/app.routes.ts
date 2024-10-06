import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: "",
    loadComponent: () => import('../app/pages/pokedex/pokedex.component').then(m => m.PokedexComponent)
}];
