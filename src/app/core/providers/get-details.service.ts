import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IDetailsResponseDTO } from '../../shared/models/details.model';
import { GET_DETAILS } from '../schema/details.schema';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetDetailsService {

  private apollo = inject(Apollo);

  constructor() { }

  getDetailsQuery(charactedIDs: string[]) {
    return this.apollo.query<IDetailsResponseDTO>({
      query: GET_DETAILS,
      variables: {
        ids: charactedIDs
      }
    })
    .pipe(
      map((response) => {
        console.log(response);
        return response;
      })
    )

  }

}
