export interface ColumnConfig<T> {
  columnDef: string;
  header: string;
  cell: (element: T) => string | number;
}

export interface ICharacterColumns {
  id: number | string;
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
  type:string;
}

export interface CharacterQueryResponseDTO {
  characters: {
    info: {
      next: number | null;
      pages: number;
    };
    results: Character[];
  };
}

export interface ICharactersResponse {
  characters: Character[];
  nextPage: number | null;
}


export interface IPagination {
  page: number;
  nextPage: number | null;
  filterPayload?: IFilterPayload
}
export interface IFilterPayload{
  name: string, 
  status: string
}