import { ShipType, Table } from '../types/play';
import { initRandomApi } from './tests/random';

export const generateArray = (size: number): Array<Array<null>> => {
  const newArr = [];
  for (let i = 0; i < size; i++) {
    newArr.push(new Array(size).fill(null));
  }

  return newArr;
};

export const populatePositon = (arr: Table, ship: ShipType, position: [number, number]) => {
  const [row, col] = position;
  arr[row][col] = ship;
};

export const addShip = (
  num: number,
  ship: ShipType,
  arr: Table,
  generateRandomNumber: (arr: Table) => [number, number]
): Array<[number, number]> => {
  const positions: Array<[number, number]> = [];

  while (num > 0) {
    const [row, col] = generateRandomNumber(arr);
    arr[row][col] = ship;
    num--;
    positions.push([row, col]);
  }
  return positions;
};

type ScoreTale = {
  count: number;
  positions: Array<[number, number]>;
};

export const populateTable = (size: number) => {
  const board = generateArray(size);
  const generateRandomNumber = initRandomApi(board.length);

  const battleship = addShip(5, ShipType.Battleship, board, generateRandomNumber);
  const destroyer = addShip(5, ShipType.Destroyer, board, generateRandomNumber);
  const submarine = addShip(10, ShipType.Submarine, board, generateRandomNumber);
  const carrier = addShip(5, ShipType.Carrier, board, generateRandomNumber);
  const cruiser = addShip(2, ShipType.Cruiser, board, generateRandomNumber);

  const scoreTable: Record<ShipType, ScoreTale> = {
    [ShipType.Battleship]: { count: battleship.length, positions: battleship },
    [ShipType.Carrier]: { count: carrier.length, positions: carrier },
    [ShipType.Cruiser]: { count: cruiser.length, positions: cruiser },
    [ShipType.Destroyer]: { count: destroyer.length, positions: destroyer },
    [ShipType.Submarine]: { count: submarine.length, positions: submarine },
  };

  return { board, scoreTable };
};

export const isGameOver = (scoreTable: Record<ShipType, ScoreTale>): boolean => {
  return !Object.keys(scoreTable).some((key) => scoreTable[key as ShipType].count > 0);
};
