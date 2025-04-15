import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CharactersService } from '../providers/characters.service';
import { ICharactersResponse } from '../../shared/models/character.model';

export const getCharactersResolver: ResolveFn<ICharactersResponse> = () => {
  const charactersService = inject(CharactersService);
  const data = charactersService.getCharacters(1);
  return data;
};
