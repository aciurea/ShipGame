export enum ShipType {
  Carrier = 'Carrier',
  Battleship = 'Battleship',
  Cruiser = 'Cruiser',
  Submarine = 'Submarine',
  Destroyer = 'Destroyer',
}
export type Table = Array<Array<string | null>>;

export interface ScoreTable {
  count: number;
  size: number;
  positions: Array<[number, number]>;
}

export type Player = {
  name: string;
  records: Record<ShipType, number>;
};
