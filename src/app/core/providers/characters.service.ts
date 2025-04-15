import { Injectable, inject, signal } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Subscription, map, expand, of, takeWhile, reduce, defer, Observable, tap, debounceTime, auditTime } from "rxjs";
import { GET_CHARACTERS } from "../schema/characters.schema";
import { toSignal } from '@angular/core/rxjs-interop';
import { Character, CharacterQueryResponseDTO } from "../../shared/models/character.model";


@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  isLoaded = signal<boolean>(false);

  private apollo = inject(Apollo);

  constructor() { }

  getCharacters(page: number): Observable<{ characters: Character[]; nextPage: number | null }> {
    return this.apollo
      .query<CharacterQueryResponseDTO>({
        query: GET_CHARACTERS,
        variables: { page },
      })
      .pipe(
        // auditTime(3000),
        map((res) => ({
          characters: res.data.characters.results,
          nextPage: res.data.characters.info.next,
        })),
        tap(() => this.isLoaded.set(true))
      );
  }

}
