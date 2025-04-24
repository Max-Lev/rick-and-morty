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

  getDetailsQuery(charactedIDs: string[]): Observable<IDetailsResponse> {
    return this.apollo.query<IDetailsResponseDTO>({
      query: GET_DETAILS,
      variables: {
        ids: charactedIDs
      },
      fetchPolicy: 'network-only'
    }).pipe(
      map((response: ApolloQueryResult<IDetailsResponseDTO>) => {
        return response.data.charactersByIds.map((character: RawCharacterDTO) => this.formatDetails(character))
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
