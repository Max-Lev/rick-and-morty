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
    charactersByIds: {
        id: string;
        name: string;
        status: string;
        species: string;
        gender: string;
        image: string;
        selected?: boolean;
        type: string;

        location: ILocation,
        origin: IOrigin,
        episode: IEpisode[]
    }[]
}

export interface IDetailsResponse {
    character: Character;
    location: ILocation;
    origin: IOrigin;
    episodes: IEpisode[];
}

export interface IFormateDetails {
    // character: {
    //     id: string;
    //     name: string;
    //     status: string;
    //     species: string;
    //     gender: string;
    //     image: string;
    //     selected?: boolean;
    //     type: string;
    //     // location: ILocation;
    //     // origin: IOrigin;
    //     // episode: IEpisode[];
    // }
    character:Character;
    location: ILocation;
    origin: IOrigin;
    episodes: IEpisode[];
}