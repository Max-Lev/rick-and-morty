import { Injectable, signal, inject } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable, map, tap } from "rxjs";
import { Character, CharacterQueryResponseDTO, IFilterPayload } from "../../shared/models/character.model";
import { GET_CHARACTERS } from "../schema/characters.schema";


@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  isLoaded = signal<boolean>(false);

  private apollo = inject(Apollo);

  constructor() { }

  getCharacters(page: number, filter?: IFilterPayload): Observable<{ characters: Character[]; nextPage: number | null }> {
    return this.apollo
      .query<CharacterQueryResponseDTO>({
        query: GET_CHARACTERS,
        variables: {
          page,
          name: filter?.name,
          status: filter?.status
        },
        // fetchPolicy: 'cache-first' 
      })
      .pipe(
        // auditTime(1000),
        // debounceTime(1000),
        map((res) => ({
          characters: res.data.characters.results.map((character) => ({
            selected: false,
            ...character,
          })),
          nextPage: res.data.characters.info.next,
        })),
        tap(() => this.isLoaded.set(true))
      );
  }


}
