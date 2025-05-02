import { ColumnConfig, ICharacterColumns } from "../../models/character.model";


export const COLUMNS:ColumnConfig<ICharacterColumns>[] = [
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
export const DETAILS_COLUMNS:ColumnConfig<ICharacterColumns>[] = [
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
  
  {
    columnDef: 'locationName',
        header: 'Location Name',
        cell: (element: ICharacterColumns) => `${element.locationName}`,
  },
  {
    columnDef: 'locationDimension',
        header: 'Location Dimension',
        cell: (element: ICharacterColumns) => `${element.locationDimension}`,
  },
  // {
  //   columnDef: 'locationId',
  //       header: 'Location ID',
  //       cell: (element: ICharacterColumns) => `${element.locationId}`,
  // },
  // {
  //   columnDef: 'originId',
  //       header: 'Origin ID',
  //       cell: (element: ICharacterColumns) => `${element.originId}`,
  // },
  {
    columnDef: 'originName',
        header: 'Origin Name',
        cell: (element: ICharacterColumns) => `${element.originName}`,
  },
  {
    columnDef: 'originDimension',
        header: 'Origin Dimension',
        cell: (element: ICharacterColumns) => `${element.originDimension}`,
  },
  
];