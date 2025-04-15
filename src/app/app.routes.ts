import { Routes } from '@angular/router';
import { getCharactersResolver } from './core/resolvers/get-characters.resolver';


export const routes: Routes = [
    {
        path:'',loadComponent: ()=>import('./shared/features/characters/characters.component').then(m=>m.CharactersComponent),
        resolve:{
            getCharactersResolver:getCharactersResolver
        },
        providers:[] // test/check injection 
        
    }
];
