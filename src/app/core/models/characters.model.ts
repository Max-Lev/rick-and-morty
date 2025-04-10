export interface Character {
    id: string;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
  }

 export interface CharacterQueryResponse {
    characters: {
      info: {
        next: number | null;
      };
      results: Character[];
    };
  }