import { ICharacterColumns } from "../../models/character.model";

export const COLUMNS = [
    {
      columnDef: 'id',
      header: 'ID.',
      cell: (element: ICharacterColumns) => `${element.id}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: ICharacterColumns) => `${element.name}`,
    },
    {
      columnDef: 'status',
      header: 'Status',
      cell: (element: ICharacterColumns) => `${element.status}`,
    },
    {
      columnDef: 'species',
      header: 'Species',
      cell: (element: ICharacterColumns) => `${element.species}`,
    },
    {
      columnDef: 'type',
      header: 'Type',
      cell: (element: ICharacterColumns) => `${element.type}`,
    },
    {
      columnDef: 'gender',
      header: 'Gender',
      cell: (element: ICharacterColumns) => `${element.gender}`,
    },
  ];