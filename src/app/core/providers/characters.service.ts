import { Injectable, inject } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Subscription, map, expand, of, takeWhile, reduce, defer, Observable } from "rxjs";
import { GET_CHARACTERS } from "../schema/characters.schema";
import { toSignal } from '@angular/core/rxjs-interop';
import { Character, CharacterQueryResponse } from "../models/characters.model";

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private apollo = inject(Apollo);

  constructor() { }

  getCharacters(page: number): Observable<{ characters: Character[]; nextPage: number | null }> {
    return this.apollo
      .query<CharacterQueryResponse>({
        query: GET_CHARACTERS,
        variables: { page },
      })
      .pipe(
        map((res) => ({
          characters: res.data.characters.results,
          nextPage: res.data.characters.info.next,
        }))
      );
  }


  // getAllCharactersSignal() {
    // const characters$= defer(() => {
    //   let page = 1;

    //   return this.apollo
    //     .query<{
    //       characters: {
    //         info: { next: number | null };
    //         results: Character[];
    //       };
    //     }>({
    //       query: GET_CHARACTERS,
    //       variables: { page },
    //     })
    //     .pipe(
    //       map((res) => res.data.characters),
    //       expand((data) => {
    //         if (data.info.next) {
    //           return this.apollo
    //             .query<{
    //               characters: {
    //                 info: { next: number | null };
    //                 results: Character[];
    //               };
    //             }>({
    //               query: GET_CHARACTERS,
    //               variables: { page: data.info.next },
    //             })
    //             .pipe(map((res) => res.data.characters));
    //         } else {
    //           return of(null);
    //         }
    //       }),
    //       takeWhile((data): data is { info: { next: number | null }; results: Character[] } => data !== null),
    //       map((data) => data.results),
    //       reduce((all, batch) => [...all, ...batch], [] as Character[])
    //     );
    // });

    // return toSignal(characters$, { initialValue: [] as Character[] });
  // }
}
