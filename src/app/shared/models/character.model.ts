export interface ColumnConfig<T> {
  columnDef: string;
  header: string;
  cell: (element: T) => string | number;
}

export interface ICharacterColumns {
  id: number | string;
  name: string;
  status: any;
  species: string;
  type: any;
  gender: string;
  locationDimension?: string;
  locationName?: string;
  locationId?: number;
  originDimension?: string;
  originId?: string;
  originName?: string;
}

export interface Character {
  id: string | number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  selected?: boolean;
  type: string;
}

export interface CharacterQueryResponseDTO {
  characters: {
    info: {
      next: number | null;
      pages: number;
      prev:number;
    };
    results: Character[];
  };
}

export interface ICharactersResponse {
  characters: Character[];
  nextPage: number | null;
  page: number;
}


export interface IPagination {
  page: number;
  nextPage: number | null;
  filterPayload?: IFilterPayload
}

export interface IFilterPayload {
  name?: string | null;
  status?: string | null;
  species?: string | null;
  gender?: string | null;
  type?: string | null;
}