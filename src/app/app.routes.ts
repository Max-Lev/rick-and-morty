import { Routes } from '@angular/router';
import { getCharactersResolver } from './core/resolvers/get-characters.resolver';


export const routes: Routes = [
    {
        path:'characters',loadComponent: ()=>import('./shared/features/characters/characters.component').then(m=>m.CharactersComponent),
        resolve:{
            charactersResolver:getCharactersResolver
        },
        providers:[] // test/check injection 
        
    },
    {
        path:'',redirectTo:'characters', pathMatch:'full'
    }
];
