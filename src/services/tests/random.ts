import { Table } from '../../types/play';

export const initRandomApi = (length: number) => {
  let pos: Record<string, number> = {};

  for (let i = 0; i < length; i++) {
    pos[`${i}`] = length;
  }

  const getAllEmptyPositions = (positions: Array<string | null>): number[] => {
    return positions.reduce((acc, val, index) => {
      if (val === null) acc.push(index);
      return acc;
    }, [] as number[]);
  };

  function generateRandomPosition(arr: Table): [number, number] {
    const rowKeys = Object.entries(pos).reduce((acc, [key, val]) => {
      if (val > 0) acc.push(key);

      return acc;
    }, [] as string[]);

    if (rowKeys.length === 0) throw new Error('No space available');
    const randomRow = Math.floor(Math.random() * rowKeys.length);
    const row = rowKeys[randomRow];

    const emptyPositions = getAllEmptyPositions(arr[+row]);
    const randomCol = Math.floor(Math.random() * emptyPositions.length);
    const col = emptyPositions[randomCol];

    pos[row] -= 1;
    return [+row, col];
  }

  return generateRandomPosition;
};
