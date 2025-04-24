import { Character } from "./character.model"

export interface ILocation {
    id: string,
    name: string,
    dimension: string
}

export interface IEpisode {
    id: string,
    name: string,
    episode: string
}
export interface IOrigin {
    id: string,
    name: string,
    dimension: string
}


export interface IDetailsResponseDTO {
    charactersByIds: RawCharacterDTO[];
  }

export type RawCharacterDTO = {
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
  };

export interface IDetail {
    character: Character;
    location: ILocation;
    origin: IOrigin;
    episodes: IEpisode[];
}

export type IDetailsResponse = IDetail[];

export interface IFormateDetails {
    character:Character;
    location: ILocation;
    origin: IOrigin;
    episodes: IEpisode[];
}