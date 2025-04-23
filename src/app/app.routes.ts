import { Routes } from '@angular/router';
import { getCharactersResolver } from './core/resolvers/get-characters.resolver';
import { detailsResolver } from './core/resolvers/details.resolver';


export const routes: Routes = [
    {
        path:'characters',loadComponent: ()=>import('./shared/features/characters/characters.component').then(m=>m.CharactersComponent),
        resolve:{
            charactersResolver:getCharactersResolver
        },
        providers:[] // test/check injection 
    },
    {
        // path:'characters/:id',loadComponent: ()=>import('./shared/features/character-detail/character-detail.component').then(m=>m.CharacterDetailComponent)
        path:'details',loadComponent: ()=>import('./shared/features/details/details.component')
        .then(m=>m.DetailsComponent),
        resolve:{
            detailsResolver:detailsResolver
        }
    },
    {
        path:'',redirectTo:'characters', pathMatch:'full'
    }
];
