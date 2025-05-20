import { Injectable, signal, inject, effect } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable, map, share, shareReplay, tap } from "rxjs";
import { Character, CharacterQueryResponseDTO, ICharactersResponse, IFilterPayload, IPagination } from "../../shared/models/character.model";
import { GET_CHARACTERS } from "../schema/characters.schema";
import { EMPTY_FILTER } from "../../shared/models/filter.model";


@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  isLoaded = signal<boolean>(false);

  private apollo = inject(Apollo);

  pageSignal = signal<number | null>(0);

  paginationSignal$ = signal<IPagination>({ page: 0, nextPage: null, filterPayload: { ...EMPTY_FILTER } });

  constructor() {

  }


  // getCharacters(page: number, filter?: IFilterPayload): Observable<{ characters: Character[]; nextPage: number | null, page: number,count?:number|null }> {
  getCharacters(page: number, filter?: IFilterPayload): Observable<ICharactersResponse> {
    return this.apollo.query<CharacterQueryResponseDTO>({
      query: GET_CHARACTERS,
      variables: <IFilterPayload>{
        page,
        name: filter?.name,
        status: filter?.status,
        gender: filter?.gender,
        species: filter?.species,
        type: filter?.type,
      },
      fetchPolicy: 'cache-first'
    })
      .pipe(
        map((res) => ({
          characters: res.data.characters.results.map((character) => ({ selected: false, ...character, })),
          nextPage: res.data.characters.info.next,
          page: res.data.characters.info.prev,
          count: res.data.characters.info.count

        })),
        tap((res) => {

          this.isLoaded.set(true);

          this.pageSignal.set(page);

          this.paginationSignal$.set({ page, nextPage: res.nextPage, count: res.count, filterPayload: { ...filter } });

        }),
        shareReplay()
      );
  }

}
