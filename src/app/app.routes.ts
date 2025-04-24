import { Routes } from '@angular/router';
import { getCharactersResolver } from './core/resolvers/get-characters.resolver';
import { detailsResolver } from './core/resolvers/details.resolver';
import { isSelectedGuard } from './core/guards/is-selected.guard';


export const routes: Routes = [
    {
        path: '', redirectTo: 'characters', pathMatch: 'full'
    },
    
    {
        path: 'characters', loadComponent: () => import('./shared/features/characters/characters.component').then(m => m.CharactersComponent),
        resolve: { charactersResolver: getCharactersResolver },
        providers: [] // test/check injection 
    },
    {
        path: 'details', loadComponent: () => import('./shared/features/details/details.component').then(m => m.DetailsComponent),
        resolve: { detailsResolver: detailsResolver },
        canActivate: [isSelectedGuard]
    },
    
    {
        path: '**', redirectTo: 'characters', pathMatch: 'full'
    },
];
