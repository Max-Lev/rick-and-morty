import { Character } from "./character.model"

export interface ILocation {
    id: string,
    name: string,
    type: string,
    dimension: string
}

export interface IEpisode {
    id:string,
    name:string,
    episode:string
}

export interface IDetailsResponseDTO {
    charactersByIds: {
        character: Character,
        location: ILocation,
        episodes: IEpisode[]
    }
}