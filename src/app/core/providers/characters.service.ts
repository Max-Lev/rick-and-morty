import { Injectable, inject, signal } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Subscription, map, expand, of, takeWhile, reduce, defer, Observable, tap, debounceTime, auditTime } from "rxjs";
import { GET_CHARACTERS } from "../schema/characters.schema";
import { toSignal } from '@angular/core/rxjs-interop';
import { Character, CharacterQueryResponseDTO } from "../../shared/models/character.model";
import { NAME_STATUS_QUERY } from "../schema/name-status.schema";


@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  isLoaded = signal<boolean>(false);

  private apollo = inject(Apollo);

  constructor() { }

  getCharacters(page: number,filter?:{name:string,status:string}): Observable<{ characters: Character[]; nextPage: number | null }> {
    return this.apollo
      .query<CharacterQueryResponseDTO>({
        query: GET_CHARACTERS,
        variables: { 
          page,
          name: filter?.name,
          status: filter?.status
        },
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



  // findByNameStatus(value: { name: string; status: string }):
  //   Observable<{ characters: Character[]; nextPage: number | null }> {
  //   return this.apollo
  //     .query<CharacterQueryResponseDTO>({
  //       query: GET_CHARACTERS,
  //       variables: value,
  //     })
  //     .pipe(
  //       map((res) => ({
  //         characters: res.data.characters.results.map((character) => ({
  //           selected: false,
  //           ...character,
  //         })),
  //         nextPage: res.data.characters.info.next,
  //       })),
  //       tap(() => this.isLoaded.set(true))
  //     );
  // }

      // // findByNameStatus(value: { name: string; status: string }): Observable<{ characters: Character[] }> {
    // debugger;
    // return this.apollo.query<CharacterQueryResponseDTO>({
    //   query: NAME_STATUS_QUERY,
    //   variables: value
    // }).pipe(
    //   map(res => ({
    //     characters: res.data.characters.results.map((character) => ({
    //       selected: false,
    //       ...character,
    //     })),
    //     nextPage: res.data.characters.info.next
    //   })),
    //   tap(() => this.isLoaded.set(true))
    // );


}
