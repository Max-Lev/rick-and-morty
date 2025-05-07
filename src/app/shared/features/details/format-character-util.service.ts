import { Injectable } from '@angular/core';
import { IDetailsResponse, IEpisode } from '../../models/details.model';

export type DetailsFormatCharacter = {
  character:{
  locationId: string;
  locationName: string;
  locationDimension: string;
  originId: string;
  originName: string;
  originDimension: string;
  id: string | number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  selected?: boolean;
  type: string;
  },
  episodes: IEpisode[]
}

@Injectable({
  providedIn: 'root'
})
export class FormatCharacterUtilService {

  constructor() { }

  formateCharacterModel(charactersDetails: IDetailsResponse): DetailsFormatCharacter[] {
    const combinedData = charactersDetails.map(({ character, location, origin, episodes }) => ({
      character: {
        ...character,
        locationId: location?.id ?? null,
        locationName: location?.name,
        locationDimension: location?.dimension,
        originId: origin?.id ?? null,
        originName: origin?.name,
        originDimension: origin?.dimension,
      },
      episodes,
    }));
     return combinedData;
  }
}
