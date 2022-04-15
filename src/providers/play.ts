import { Player, ScoreTable, ShipType, Table } from '../types/play';
import { initRandomApi } from './tests/random';

export const generateArray = (size: number): Array<Array<null | string>> => {
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

export const populateTable = (size: number) => {
  const board = generateArray(size);
  const generateRandomNumber = initRandomApi(board.length);

  const battleship = addShip(5, ShipType.Battleship, board, generateRandomNumber);
  const destroyer = addShip(5, ShipType.Destroyer, board, generateRandomNumber);
  const submarine = addShip(10, ShipType.Submarine, board, generateRandomNumber);
  const carrier = addShip(5, ShipType.Carrier, board, generateRandomNumber);
  const cruiser = addShip(2, ShipType.Cruiser, board, generateRandomNumber);

  const scoreTable: Record<ShipType, ScoreTable> = {
    [ShipType.Battleship]: { size: battleship.length, positions: battleship, count: 0 },
    [ShipType.Carrier]: { size: carrier.length, positions: carrier, count: 0 },
    [ShipType.Cruiser]: { size: cruiser.length, positions: cruiser, count: 0 },
    [ShipType.Destroyer]: { size: destroyer.length, positions: destroyer, count: 0 },
    [ShipType.Submarine]: { size: submarine.length, positions: submarine, count: 0 },
  };

  return { board, scoreTable };
};

export const isGameOver = (scoreTable: Record<ShipType, ScoreTable>): boolean => {
  return Object.keys(scoreTable).every((key) => {
    const { size, count } = scoreTable[key as ShipType];

    return size === count;
  });
};

export const add = (player: Player, col: ShipType): Player => {
  return {
    name: player.name,
    records: {
      ...player.records,
      [col as ShipType]: player.records[col as ShipType] + 1,
    },
  };
};
