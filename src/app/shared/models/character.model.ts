
export interface ICharacterColumns {
    id: number;
    name: string;
    status: any;
    species: any;
    type: any;
    gender: any;
}

export interface Character {
    id: string;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
    selected?: boolean;
  }

 export interface CharacterQueryResponseDTO {
    characters: {
      info: {
        next: number | null;
        pages:number;
      };
      results: Character[];
    };
  }

export interface ICharactersResponse{
    characters: Character[];
    nextPage: number | null;
}

export enum STATUS_ENUM{
    'Alive' = 1, 
    'Dead' = 2,
    'unknown' = 3
}