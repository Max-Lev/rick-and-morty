import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IDetailsResponse, IDetailsResponseDTO, IEpisode, IFormateDetails, ILocation, IOrigin, RawCharacterDTO } from '../../shared/models/details.model';
import { GET_DETAILS } from '../schema/details.schema';
import { map, tap } from 'rxjs/operators';
import { ApolloQueryResult } from '@apollo/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDetailsService {

  private apollo = inject(Apollo);

  getDetailsQuery(characterIDs: string[]): Observable<IDetailsResponse> {
    console.log(characterIDs)
    return this.apollo.query<IDetailsResponseDTO>({
      query: GET_DETAILS,
      variables: {
        ids: characterIDs
      },
      fetchPolicy: 'network-only'
    }).pipe(
      map((response: ApolloQueryResult<IDetailsResponseDTO>) => {
        
        const characters = response.data.charactersByIds;
        // return response.data.charactersByIds.map((character: RawCharacterDTO) => this.formatDetails(character))

        // 1. Create a Map from ID to character
        const characterMap = new Map(characters.map((char: RawCharacterDTO) => [char.id, this.formatDetails(char)]));

        // 2. Return results in the order of requested IDs
        return characterIDs.map(id => characterMap.get(`${id}`)!) as IDetailsResponse;

      }),
      tap((character) => console.log(character))
    );

  }

  formatDetails(res: RawCharacterDTO): IFormateDetails {
    const { id, name, gender, species, status, image, type, location, origin, episode } = res;
    return {
      character: { id, name, gender, species, status, image, type },
      location,
      origin,
      episodes: episode
    };
  }

}
