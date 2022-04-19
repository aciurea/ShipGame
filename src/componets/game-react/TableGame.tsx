import * as React from 'react';
import { chooseValueByComputer, getAllIndexes, getNewScore, getValue } from '../../providers/play';
import { ScoreTable, ShipType } from '../../types/play';
import { useGame, useGameDispatch } from './game-context';
import { Overlay } from './Overlay';

const TableGame = () => {
  const dispatch = useGameDispatch();
  const { table, score, turn, config, isOver } = useGame();
  const { current: computerOptions } = React.useRef(getAllIndexes(table));
  const tableRef = React.useRef<HTMLElement | null>(null);
  const [showOverflay, setShowOverlay] = React.useState(false);

  if (!score || !config) return null;

  return (
    <section
      ref={tableRef}
      className="board"
      style={{ position: 'relative' }}
      onClick={({ target }: any) => {
        if (isOver) return;
        const { col, dirty, index } = getValue(target.dataset?.col);

        if (!dirty) dispatch({ type: 'setTurn', turn: turn === 0 ? 1 : 0 });
        if (dirty || col === '') return;

        if (config.isComputer && turn === 0) {
          setShowOverlay(true);
          const timeoutId = setTimeout(() => {
            if (tableRef.current) chooseValueByComputer(tableRef.current, computerOptions);
            setShowOverlay(false);
            clearTimeout(timeoutId);
          }, 1000);
        }

        if (col !== null) {
          const newScore = getNewScore({ score, col, config, turn });
          dispatch({
            type: 'setScore',
            ...newScore,
          });

          const ship = newScore.score[col as ShipType];
          revealCellsWhenShipIsSank(index, ship, target);
        }

        computerOptions.delete(index);
        target.dataset.col = JSON.stringify({ col, dirty: true });
        target.children[0].style.cursor = 'not-allowed';
        showCell(target);
      }}
    >
      {table?.map((row, rowIndex) => {
        const key = `${JSON.stringify(row)}_${rowIndex}`;

        return (
          <section className="row" key={key}>
            {row.map((col, colIndex) => (
              <section
                key={key + colIndex}
                className="col"
                data-col={JSON.stringify({ col, dirty: false, index: `${rowIndex};${colIndex}` })}
              >
                <img
                  src={col ? '/assets/HitSmall.png' : '/assets/MissSmall.png'}
                  alt={col ? 'hit' : 'miss'}
                  style={{ maxWidth: '70%', height: 'auto', visibility: 'hidden' }}
                />
              </section>
            ))}
          </section>
        );
      })}
      {showOverflay ? <Overlay /> : null}
    </section>
  );
};

export default TableGame;

function revealCellsWhenShipIsSank(index: string, ship: ScoreTable, target: any) {
  if (index && ship.count === ship.size) {
    const [rowIndex, colIndex] = index.split(';');

    const parent = target.parentElement;
    const leftSibling = parent.children[+colIndex - 1];
    const rightSibling = parent.children[+colIndex + 1];

    if (leftSibling) showCell(leftSibling);
    if (rightSibling) showCell(rightSibling);

    const grandParent = parent.parentElement;
    const upperSibling = grandParent.children[+rowIndex - 1]?.children[+colIndex];
    const downSibling = grandParent.children[+rowIndex + 1]?.children[+colIndex];

    if (upperSibling) showCell(upperSibling);
    if (downSibling) showCell(downSibling);
  }
}

function showCell(element: HTMLElement) {
  (element.children[0] as HTMLElement).style.visibility = 'visible';
}
