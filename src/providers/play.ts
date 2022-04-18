import { NewScoreProps, Player, ScoreTable, ShipType, Table } from '../types/play';
import { getRandomNum, initRandomApi } from './random';

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

type TableProps = { size: number } & Record<ShipType, string | number>;
export const populateTable = ({ size, ...rest }: TableProps) => {
  const board = generateArray(size);
  const generateRandomNumber = initRandomApi(board.length);

  const battleship = addShip(+rest.Battleship, ShipType.Battleship, board, generateRandomNumber);
  const destroyer = addShip(+rest.Destroyer, ShipType.Destroyer, board, generateRandomNumber);
  const submarine = addShip(+rest.Submarine, ShipType.Submarine, board, generateRandomNumber);
  const carrier = addShip(+rest.Carrier, ShipType.Carrier, board, generateRandomNumber);
  const cruiser = addShip(+rest.Cruiser, ShipType.Cruiser, board, generateRandomNumber);

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

export const getCount = (records: Record<ShipType, number>): number =>
  Object.keys(records).reduce((acc, record) => (acc += records[record as ShipType]), 0);

export const getWinner = (player1: Player, player2: Player): string => {
  const p1Count = getCount(player1.records);
  const p2Count = getCount(player2.records);

  return p1Count === p2Count ? 'No one ' : p1Count > p2Count ? player2.name : player1.name;
};

export const getAllIndexes = (table: Table): Set<string> => {
  const set = new Set<string>();
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) set.add(`${i};${j}`);
  }

  return set;
};

export const getValue = (data: string): { col: string; dirty: boolean; index: string } => {
  if (!data) return { col: '', dirty: true, index: '' };

  return JSON.parse(data);
};

export const chooseValueByComputer = (table: HTMLElement, options: Set<string>) => {
  const values = Array.from(options);
  const randomNum = getRandomNum(options.size);
  const [row, col] = values[randomNum].split(';');
  const element = table.children[+row]?.children[+col] as HTMLElement;

  element?.click();
};

export const getNewScore = ({ score, col, config, turn }: NewScoreProps) => {
  const [player1, player2] = config.players;
  const ship = score[col as ShipType];
  const newScore = {
    ...score,
    [col]: {
      ...ship,
      count: ship.count + 1,
    },
  };

  // destroy the ship of the other player
  const newPlayer1 = turn === 0 ? { ...player1 } : add(player1, col as ShipType);
  const newPlayer2 = turn === 1 ? { ...player2 } : add(player2, col as ShipType);
  const players: [Player, Player] = [newPlayer1, newPlayer2];

  return { score: newScore, players };
};

export const getMaxShips = (value: number): number => {
  const maxValue = value * value;

  return Math.floor(maxValue * 0.6);
};

export const getAllMax = (max: number, elements: any): number => {
  const {
    Battleship: { value: battleshipValue },
    Carrier: { value: carrierValue },
    Destroyer: { value: destroyerValue },
    Cruiser: { value: cruiserValue },
    Submarine: { value: submarineValue },
  } = elements ?? {
    BattleShip: { value: 0 },
    Carrier: { value: 0 },
    Destroyer: { value: 0 },
    Cruiser: { value: 0 },
    Submarine: { value: 0 },
  };

  return max - battleshipValue - carrierValue - destroyerValue - cruiserValue - submarineValue;
};
