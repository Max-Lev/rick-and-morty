import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CharactersService } from '../providers/characters.service';
import { toSignal } from '@angular/core/rxjs-interop';

export const getCharactersResolver: ResolveFn<boolean> = (route, state) => {
  const charactersService = inject(CharactersService);
  // const data = toSignal(charactersService.getCharacters(1));
  // data();
  debugger;
  return true;
};
