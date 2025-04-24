import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IDetailsResponse, IDetailsResponseDTO, IEpisode, IFormateDetails, ILocation, IOrigin } from '../../shared/models/details.model';
import { GET_DETAILS } from '../schema/details.schema';
import { map, tap } from 'rxjs/operators';
import { ApolloQueryResult } from '@apollo/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDetailsService {

  private apollo = inject(Apollo);

  getDetailsQuery(charactedIDs: string[]): Observable<IDetailsResponse[]> {
    return this.apollo.query<IDetailsResponseDTO>({
      query: GET_DETAILS,
      variables: {
        ids: charactedIDs
      },
      fetchPolicy: 'network-only'
    }).pipe(
      map((response: ApolloQueryResult<IDetailsResponseDTO>) => {
        return response.data.charactersByIds.map((character: {
          id: string;
          name: string;
          status: string;
          species: string;
          gender: string;
          image: string;
          selected?: boolean;
          type: string;
          location: ILocation;
          origin: IOrigin;
          episode: IEpisode[];
        }) => this.formatDetails(character))
      }),
      tap((character) => console.log(character))
    );

  }

  formatDetails(res: {
    id: string;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
    selected?: boolean;
    type: string;
    location: ILocation;
    origin: IOrigin;
    episode: IEpisode[];
  }): IFormateDetails {
    return ({
      character: {
        id: res.id,
        name: res.name,
        gender: res.gender,
        species: res.species,
        status: res.status,
        image: res.image,
        type: res.type,
      },
      location: res.location,
      episodes: res.episode,
      origin: res.origin
    })
  }
  // getDetailsQuery(charactedIDs: string[]): Observable<IDetailsResponse[]> {
  //   return this.apollo.query<IDetailsResponseDTO>({
  //     query: GET_DETAILS,
  //     variables: {
  //       ids: charactedIDs
  //     },
  //     fetchPolicy: 'network-only'
  //   }).pipe(
  //     map((response: ApolloQueryResult<IDetailsResponseDTO>) => {
  //       return response.data.charactersByIds.map((character) => {
  //         return {
  //             character: {
  //               id: character.id,
  //               name: character.name,
  //               gender: character.gender,
  //               species: character.species,
  //               status: character.status,
  //               image: character.image,
  //               type: character.type,
  //             },
  //             location: character.location,
  //             episodes: character.episode,
  //             origin: character.origin
  //           }
  //       })
  //     }),
  //     tap((character) => console.log(character))
  //   );

  // }

}
