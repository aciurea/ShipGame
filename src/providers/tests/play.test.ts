import { ShipType } from '../../types/play';
import { isGameOver, generateArray, populatePositon } from '../play';

describe('Play', () => {
  test('should generate array', () => {
    const arr = generateArray(10);
    expect(arr).toHaveLength(10);
    expect(arr[0]).toHaveLength(10);

    const arr2 = generateArray(7);
    expect(arr2).toHaveLength(7);
    expect(arr2[0]).toHaveLength(7);
  });

  test('should populate the positions', () => {
    const arr = generateArray(10);

    populatePositon(arr, ShipType.Battleship, [0, 5]);
    expect(arr[0][5]).toBe(ShipType.Battleship);

    populatePositon(arr, ShipType.Cruiser, [1, 7]);
    expect(arr[1][7]).toBe(ShipType.Cruiser);
  });

  test('check if the game is over', () => {
    const scoreTable = {
      [ShipType.Battleship]: { count: 0, positions: [], size: 0 },
      [ShipType.Carrier]: { count: 0, positions: [], size: 0 },
      [ShipType.Cruiser]: { count: 0, positions: [], size: 0 },
      [ShipType.Destroyer]: { count: 0, positions: [], size: 0 },
      [ShipType.Submarine]: { count: 0, positions: [], size: 0 },
    };
    expect(isGameOver(scoreTable)).toBe(true);

    scoreTable[ShipType.Battleship] = { count: 1, positions: [], size: 1 };
    expect(isGameOver(scoreTable)).toBe(true);

    scoreTable[ShipType.Battleship] = { count: 0, positions: [], size: 1 };
    expect(isGameOver(scoreTable)).toBe(false);
  });
});
