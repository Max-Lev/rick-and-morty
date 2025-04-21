export enum STATUS_ENUM {
  'Alive' = 1,
  'Dead' = 2,
  'unknown' = 3
}

export enum DIALOG_TYPE_ENUM {
  filter = 1,
  live = 2
}

export const STATUS_OPTIONS = [
  { key: STATUS_ENUM.Alive, value: 'Alive' },
  { key: STATUS_ENUM.Dead, value: 'Dead' },
  { key: STATUS_ENUM.unknown, value: 'Unknown' }
];